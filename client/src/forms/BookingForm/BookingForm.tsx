import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../server/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  totalCost: number;
  paymentIntentId: string;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const search = useSearchContext();
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ type: "SUCCESS", message: "Booking Confirmed!" });
      },
      onError: () => {
        showToast({ type: "ERROR", message: "Error saving booking" });
      },
    }
  );

  const { register, handleSubmit, reset, getValues } = useForm<BookingFormData>(
    {
      defaultValues: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        adultCount: search.adultCount,
        childCount: search.childCount,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        hotelId: hotelId,
        totalCost: paymentIntent.totalCost,
        paymentIntentId: paymentIntent.paymentIntentId,
      },
    }
  );

  useEffect(() => {
    const existingValues = getValues();
    reset({
      ...existingValues,
      totalCost: paymentIntent.totalCost,
    });
  }, [paymentIntent.totalCost]);

  const [paymentInProcess, setPaymentInProcess] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    setPaymentInProcess(true);
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    setPaymentInProcess(false);

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 border border-slate-300 rounded-lg p-5"
    >
      <span className="text-3xl font-semibold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal text-gray-700 focus:outline-none bg-gray-200"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal text-gray-700 focus:outline-none bg-gray-200"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal text-gray-700 focus:outline-none bg-gray-200"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-lg">
          <div className="font-semibold text-lg">
            Total Cost: ₹{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges.</div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold flex items-center">
            Payment Details &nbsp;
          </h2>
          <div className="group flex relative">
            <FaCircleInfo className="animate-bounce text-lg" />
            <span
              className="group-hover:opacity-100 transition-opacity bg-gray-800 p-3 text-xs text-gray-100 rounded-md absolute 
    translate-x-5 -translate-y-24 opacity-0 m-4 mx-auto w-80"
            >
              <span className="block font-semibold">Testing?</span>
              INDIA 🇮🇳: Card No.: 4000003560000008, any future date for MM/YY &
              any 3 digits for CVC. 
              <span className="inline-block">Other Countries: &nbsp;</span>
              <a
                href="https://docs.stripe.com/testing?testing-method=card-numbers#visa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 inline"
              >
                check this ↗
              </a>
            </span>
          </div>
        </div>
        <CardElement id="payment-element" className="border rounded-lg p-3" />
      </div>

      <div className="flex justify-center">
        <button
          disabled={isLoading || paymentInProcess}
          type="submit"
          className="bg-blue-500 text-white p-2 font-bold h-full hover:bg-blue-400 text-base rounded-md cursor-pointer w-1/3 transition disabled:bg-gray-500"
        >
          {paymentInProcess
            ? "Processing..."
            : isLoading
            ? "Saving..."
            : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
