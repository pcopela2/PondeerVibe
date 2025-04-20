import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

export const calculatePaymentSplit = (amount: number) => {
  const platformFeePercentage = Number(process.env.PLATFORM_FEE_PERCENTAGE) || 5;
  const stripeFeePercentage = 2.9;
  const stripeFixedFee = 0.30;

  const platformFee = Math.round(amount * (platformFeePercentage / 100));
  const stripeFee = Math.round(amount * (stripeFeePercentage / 100) + stripeFixedFee * 100);
  const vendorAmount = amount - platformFee - stripeFee;

  return {
    total: amount,
    platformFee,
    stripeFee,
    vendorAmount,
  };
};

export const createPaymentIntent = async (
  amount: number,
  vendorStripeAccountId: string
) => {
  const { platformFee, vendorAmount } = calculatePaymentSplit(amount);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      application_fee_amount: platformFee,
      transfer_data: {
        destination: vendorStripeAccountId,
      },
    });

    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}; 