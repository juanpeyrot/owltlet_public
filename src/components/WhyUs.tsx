import { Crown, Lightbulb, ShieldCheck } from "lucide-react";

const WhyUs = () => {
  return (
    <section className="mt-16 w-full text-left">
      <h2 className="text-2xl font-bold dark:text-dark-title">Why choose us</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <div className="text-center">
          <Lightbulb className="mx-auto h-12 w-12 mb-4 dark:text-yellow-500" />
          <h3 className="text-lg font-semibold dark:text-yellow-500">
            Innovation
          </h3>
          <p className="mt-2 text-sm text-muted-foreground dark:text-dark-text">
            Cutting-edge technology at your fingertips.
          </p>
        </div>
        <div className="text-center">
          <Crown className="mx-auto h-12 w-12 mb-4 dark:text-yellow-500" />
          <h3 className="text-lg font-semibold dark:text-yellow-500">
            Quality
          </h3>
          <p className="mt-2 text-sm text-muted-foreground dark:text-dark-text">
            Only the best products make it to our store.
          </p>
        </div>
        <div className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 mb-4 dark:text-yellow-500" />
          <h3 className="text-lg font-semibold dark:text-yellow-500">
            Support
          </h3>
          <p className="mt-2 text-sm text-muted-foreground dark:text-dark-text">
            We’re here for you every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
