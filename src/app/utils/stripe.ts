import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStipePromise = () => {
  const key =  "pk_test_51Nb6UwJBAtmMzAzUtXVCnEnrp51FNVOM4RwMfNbUO9DVZG98b8mpt2dnJSCWfgy2MoX4SjvSenJZ6dLB4qGWLkf0005NDnKnHW";

  if (!stripePromise && !!key) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStipePromise;
