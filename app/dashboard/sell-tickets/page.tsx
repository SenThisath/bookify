"use client";

import { createStripeAccount } from "@/app/actions/createStripeAccount";
import { getStripeAccountStatus } from "@/app/actions/getStripeAccountStatus";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createStripeAccountonnectAccountLink } from "@/app/actions/createStripeConnectAccountLink";
import { createStripeConnectLoginLink } from "@/app/actions/createStripeLoginLink";

const SellTickets = () => {
  const { user } = useUser();
  const getUser = useQuery(api.users.getUser, { userId: user?.id ?? "" });
  const [status, setStatus] = useState<
    | {
        isActive: boolean;
        isRequiredInformation: boolean;
        requiredInformation: {
          currentlyDue: string[];
          eventuallyDue: string[];
          pastDue: string[];
        };
        chargesEnabled: boolean;
        payoutsEnabled: boolean;
      }
    | undefined
  >();

  const router = useRouter();

  useEffect(() => {
    if (getUser?.stripeConnectId) {
      fetchAccountStatus();
    }
  }, [getUser?.stripeConnectId]);

  const fetchAccountStatus = async () => {
    if (getUser?.stripeConnectId) {
      try {
        const status = await getStripeAccountStatus(getUser.stripeConnectId);
        setStatus(status);
      } catch (error) {
        console.error("Error fetching account status:", error);
      }
    }
  };

  const handleManageAccount = async () => {
    try {
      if (getUser?.stripeConnectId && status?.isActive) {
        const loginUrl = await createStripeConnectLoginLink(
          getUser?.stripeConnectId
        );
        window.location.href = loginUrl;
      }
    } catch (error) {
      console.error("Error accessing Stripe Connect portal:", error);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="p-8 bg-card rounded-3xl shadow-xl space-y-8 max-w-3xl mx-auto border">
        {!getUser?.stripeConnectId && (
          <Button
            onClick={async () => {
              try {
                await createStripeAccount();
              } catch (error) {
                console.error("Error creating Stripe Connect customer:", error);
              }
            }}
          >
            Connect Stripe Account
          </Button>
        )}

        {status?.isActive && (
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-green-100 px-6 py-3 rounded-full shadow-sm">
              <span className="text-green-700 font-bold text-xl">
                🎉 Ready to create amazing events!
              </span>
            </div>
          </div>
        )}

        {getUser?.stripeConnectId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-xl transition-all duration-300 ${
                status?.isActive
                  ? "bg-green-100 border border-green-300 shadow-sm"
                  : "bg-red-100 border border-red-300 shadow-sm"
              }`}
            >
              <div className="text-center text-lg font-medium">
                {status?.isActive ? (
                  <div className="text-green-700 flex items-center justify-center space-x-2">
                    <span className="text-2xl">✅</span>
                    <span>Account Active</span>
                  </div>
                ) : (
                  <div className="text-red-700 flex items-center justify-center space-x-2">
                    <span className="text-2xl">❌</span>
                    <span>Account Inactive</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-gray-300 shadow-sm">
              <p
                className={`text-lg font-medium ${
                  status?.payoutsEnabled ? "text-green-700" : "text-red-700"
                }`}
              >
                {status?.payoutsEnabled
                  ? "✔️ Can Receive Payments"
                  : "❌ Cannot Receive Payments"}
              </p>
            </div>
          </div>
        )}

        {status?.requiredInformation && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-yellow-800 mb-4">
              ⚠️ Required Information
            </h3>
            {status.requiredInformation.currentlyDue.length > 0 && (
              <div className="mb-4">
                <p className="text-yellow-800 font-medium mb-2">
                  Action Required:
                </p>
                <ul className="list-disc pl-5 text-yellow-700 text-sm space-y-2">
                  {status.requiredInformation.currentlyDue.map((req) => (
                    <li key={req}>{req.replace(/_/g, " ")}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={async () => {
                try {
                  const url = await createStripeAccountonnectAccountLink(
                    getUser?.stripeConnectId ?? ""
                  );
                  router.push(url?.url ?? "");
                } catch (error) {
                  console.error(
                    "Error creating Stripe Connect account link:",
                    error
                  );
                }
              }}
              className="mt-4 bg-yellow-500 text-white px-5 py-3 rounded-xl hover:bg-yellow-600 transition-all w-full font-semibold shadow-md hover:shadow-lg"
            >
              Complete Requirements
            </button>
          </div>
        )}

        {status && status?.requiredInformation.eventuallyDue.length > 0 && (
          <div>
            <p className="text-yellow-800 font-medium mb-2">
              🕒 Eventually Needed:
            </p>
            <ul className="list-disc pl-5 text-yellow-700 text-sm space-y-2">
              {status?.requiredInformation.eventuallyDue.map((req) => (
                <li key={req}>{req.replace(/_/g, " ")}</li>
              ))}
            </ul>
          </div>
        )}

        {status?.isActive && (
          <>
            <Button
              onClick={handleManageAccount}
              className="px-5 py-6 w-full"
              variant={"destructive"}
            >
              <span>Seller Dashboard</span>
            </Button>

            <Button
              onClick={() => router.push("/dashboard/sell-tickets/new-event")}
              className="px-5 py-6 w-full"
            >
              Create New Event
            </Button>
          </>
        )}

        <div>
          <Button
            onClick={fetchAccountStatus}
            className="w-full px-3 py-6"
            variant={"secondary"}
          >
            Refresh Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellTickets;
