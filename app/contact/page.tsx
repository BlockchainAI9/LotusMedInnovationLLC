"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import intlTelInput from "intl-tel-input";

type PhoneInstance = ReturnType<typeof intlTelInput>;

const phoneItiOptions = {
  initialCountry: "us" as const,
  separateDialCode: true,
  countrySearch: true,
  countrySelectorMode: "DROPDOWN" as const,
  matchDropdownWidth: false,
  loadUtils: () => import("intl-tel-input/utils"),
  uiTranslations: {
    searchPlaceholder: "Search country...",
    searchEmptyState: "No countries found",
  },
};

const pinCountryDropdown = (
  input: HTMLInputElement,
  mode: "desktop" | "mobile"
) => {
  const dropdown = input
    .closest(".iti")
    ?.querySelector(".iti__country-selector") as HTMLElement | null;
  if (!dropdown) return;

  const inputRect = input.getBoundingClientRect();
  dropdown.style.setProperty("position", "fixed", "important");
  dropdown.style.setProperty("top", `${inputRect.bottom + 6}px`, "important");

  if (mode === "mobile") {
    const width = Math.min(270, window.innerWidth - 24);
    const left = Math.min(
      Math.max(12, inputRect.right - width),
      window.innerWidth - width - 12
    );
    dropdown.style.setProperty("left", `${left}px`, "important");
    dropdown.style.setProperty("right", "auto", "important");
    dropdown.style.setProperty("width", `${width}px`, "important");
    dropdown.style.setProperty("min-width", `${width}px`, "important");
    dropdown.style.setProperty("max-width", `${width}px`, "important");
    return;
  }

  dropdown.style.setProperty("left", "auto", "important");
  dropdown.style.setProperty("right", "33px", "important");
  dropdown.style.setProperty("width", "270px", "important");
  dropdown.style.setProperty("min-width", "270px", "important");
  dropdown.style.setProperty("max-width", "270px", "important");
};

const attachPhoneInput = (
  input: HTMLInputElement | null,
  mode: "desktop" | "mobile"
) => {
  if (!input) return null;

  const instance = intlTelInput(input, phoneItiOptions);
  const schedulePin = () => {
    pinCountryDropdown(input, mode);
    requestAnimationFrame(() => pinCountryDropdown(input, mode));
    window.setTimeout(() => pinCountryDropdown(input, mode), 50);
  };
  input.addEventListener("open:countryselector", schedulePin);

  return {
    instance,
    cleanup: () => {
      input.removeEventListener("open:countryselector", schedulePin);
      instance.destroy();
    },
  };
};

type ContactFormFieldsProps = {
  phoneInputRef: React.RefObject<HTMLInputElement | null>;
  stacked?: boolean;
  emailError: string;
  phoneError: string;
  formError: string;
  isSubmitting: boolean;
  showSuccess: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDismissSuccess: () => void;
  onEmailChange: () => void;
  onPhoneChange: () => void;
};

const ContactFormFields = ({
  phoneInputRef,
  stacked = false,
  emailError,
  phoneError,
  formError,
  isSubmitting,
  showSuccess,
  onSubmit,
  onDismissSuccess,
  onEmailChange,
  onPhoneChange,
}: ContactFormFieldsProps) => (
  <>
    {showSuccess ? (
      <div className="flex flex-col items-center justify-center text-center my-[21px]">
        <p className="font-spectral text-[15px] leading-[18px] text-[#1e0945]">
          Your message was successfully sent!
          We will reply to you shortly.
        </p>
        <button
          className="mt-[21px] h-[39px] min-w-[69px] border-none rounded-[3px] bg-[#1e0945] px-[21px] font-spectral text-[15px] leading-[21px] font-bold text-white"
          type="button"
          onClick={onDismissSuccess}
        >
          OK
        </button>
      </div>
    ) : null}

    <div className={showSuccess ? "hidden" : ""}>
      <h2 className="text-[#1e0945] text-[21px] leading-[27px] font-normal text-center mb-[15px]">
        Drop Us a Line!
      </h2>
      <form className="font-spectral space-y-[15px] text-[#1e0945]" onSubmit={onSubmit}>
        <div className={`grid gap-[15px] ${stacked ? "grid-cols-1" : "grid-cols-2"}`}>
          <div>
            <span className="mb-[9px] block text-[15px] leading-[21px] font-normal">First Name</span>
            <input
              className="h-[42px] w-full rounded-[30px] border border-[#191614] cursor-text py-[9px] px-[15px] font-normal text-[15px] leading-[21px] outline-none placeholder:text-[#363636]"
              name="firstName"
              placeholder="John"
              type="text"
            />
          </div>
          <div>
            <span className="mb-[9px] block text-[15px] leading-[21px] font-normal">Last Name</span>
            <input
              className="h-[42px] w-full rounded-[30px] border border-[#191614] cursor-text py-[9px] px-[15px] font-normal text-[15px] leading-[21px] outline-none placeholder:text-[#363636]"
              name="lastName"
              placeholder="Doe"
              type="text"
            />
          </div>
        </div>

        <div className={`grid gap-[15px] ${stacked ? "grid-cols-1" : "grid-cols-2"}`}>
          <div>
            <span className="mb-[9px] block text-[15px] leading-[21px] font-normal">Email *</span>
            <input
              className={`h-[42px] w-full rounded-[30px] border cursor-text py-[9px] px-[15px] font-normal text-[15px] leading-[21px] outline-none placeholder:text-[#363636] ${emailError ? "border-[#ff3939]" : "border-[#191614]"}`}
              name="email"
              placeholder="example@domain..."
              type="text"
              onChange={onEmailChange}
            />
            {emailError && (
              <p className="mt-[9px] text-[12px] leading-[15px] font-spectral text-[#370000]">
                {emailError}
              </p>
            )}
          </div>
          <div className="min-w-0 w-full">
            <span className="mb-[9px] block text-[15px] leading-[21px] font-normal">Phone</span>
            <input
              ref={phoneInputRef}
              className={`phone-input-wrapper font-spectral ${phoneError ? "phone-input-error" : ""}`}
              name="phone"
              placeholder="0000 000000"
              type="tel"
              onChange={onPhoneChange}
            />
            {phoneError && (
              <p className="mt-[9px] text-[12px] leading-[15px] font-spectral text-[#370000]">
                {phoneError}
              </p>
            )}
          </div>
        </div>

        <div>
          <span className="mb-[9px] block text-[15px] leading-[21px] font-normal">Message</span>
          <textarea
            className="min-h-[81px] block max-h-[81px] resize-none w-full rounded-[18px] border border-[#191614] cursor-text py-[9px] px-[15px] font-normal text-[15px] leading-[21px] outline-none placeholder:text-[#363636]"
            name="message"
          />
        </div>

        {isSubmitting ? (
          <div className="flex h-[49px] items-center justify-center">
            <div className="contact-submit-loader" aria-label="Sending message" />
          </div>
        ) : (
          <button
            className="contact-submit-btn mx-auto border-none rounded-[3px] bg-[#1e0945] px-[30px] py-[12px] h-[48px] sm:h-[49px] text-[15px] leading-[21px] font-spectral font-bold text-white transition hover:bg-[#1e0945]/90"
            style={{ width: 111, minWidth: 111, maxWidth: 111 }}
            type="submit"
          >
            Submit
          </button>
        )}
      </form>
      {formError && !isSubmitting && (
        <p className="mt-[12px] text-[15px] leading-[18px] font-spectral text-[#370000]">
          {formError}
        </p>
      )}
    </div>
  </>
);

const Contact = () => {
  const desktopPhoneInputRef = React.useRef<HTMLInputElement>(null);
  const mobilePhoneInputRef = React.useRef<HTMLInputElement>(null);
  const desktopPhoneInstanceRef = React.useRef<PhoneInstance | null>(null);
  const mobilePhoneInstanceRef = React.useRef<PhoneInstance | null>(null);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getPhoneInstance = (form: HTMLFormElement) => {
    const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]');
    if (phoneInput && typeof intlTelInput.getInstance === "function") {
      const fromLib = intlTelInput.getInstance(phoneInput);
      if (fromLib) return fromLib;
    }
    if (phoneInput === mobilePhoneInputRef.current) {
      return mobilePhoneInstanceRef.current;
    }
    return desktopPhoneInstanceRef.current;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const phoneInstance = getPhoneInstance(form);
    const phoneValue =
      phoneInstance?.getNumber() ||
      String(formData.get("phone") || "").trim();
    const phoneCheck = phoneInstance?.isValidNumber();
    const phoneValid = phoneCheck === true || (phoneCheck == null && phoneValue.replace(/\D/g, "").length >= 8);

    let hasError = false;

    if (!email) {
      setEmailError("This field is required");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!phoneValue || !phoneValid) {
      setPhoneError("Please enter a valid phone number");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (hasError) {
      setFormError("Please fill all the fields correctly");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phoneValue,
          message,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setFormError(payload?.error || "Could not send your message. Please try again.");
        return;
      }

      setShowSuccess(true);
      form.reset();
      desktopPhoneInstanceRef.current?.setNumber("");
      mobilePhoneInstanceRef.current?.setNumber("");
    } catch {
      setFormError("Could not send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const desktop = attachPhoneInput(desktopPhoneInputRef.current, "desktop");
    const mobile = attachPhoneInput(mobilePhoneInputRef.current, "mobile");
    desktopPhoneInstanceRef.current = desktop?.instance ?? null;
    mobilePhoneInstanceRef.current = mobile?.instance ?? null;

    return () => {
      desktop?.cleanup();
      mobile?.cleanup();
      desktopPhoneInstanceRef.current = null;
      mobilePhoneInstanceRef.current = null;
    };
  }, []);

  const formFieldProps = {
    emailError,
    phoneError,
    formError,
    isSubmitting,
    showSuccess,
    onSubmit: handleFormSubmit,
    onDismissSuccess: () => setShowSuccess(false),
    onEmailChange: () => {
      setEmailError("");
      setFormError("");
    },
    onPhoneChange: () => {
      setPhoneError("");
      setFormError("");
    },
  };

  return (
    <section className="relative min-h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mumbai.jpg"
          alt="Contact background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* ===== Mobile (stacked) ===== */}
      <div
        className="relative z-10 md:hidden px-4 pt-28 pb-8 space-y-4"
        style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
      >
        {/* Contact Info */}
        <div className="bg-black/40 rounded-xl p-6 text-white w-full max-w-md mx-auto">
          <div className="mb-6 text-center">
            <p className="text-lg font-medium">Lotus Med Innovation LLC</p>
          </div>
          <div className="mb-4">
            <h3 className="font-light text-sm">Address:</h3>
            <p className="text-sm leading-relaxed">
              369 S Doheny Dr., PH 132<br />
              Beverly Hills, CA 90211<br />
              U.S.A.
            </p>
          </div>
          <div>
            <h3 className="font-light text-sm">Email:</h3>
            <p className="text-sm email-contact">info@lotusmedinnovation.com</p>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="relative w-full overflow-visible bg-white rounded-[24px] py-[39px] px-[39px]">
            <ContactFormFields
              phoneInputRef={mobilePhoneInputRef}
              stacked
              {...formFieldProps}
            />
          </div>
        </div>

        <div className="text-center text-white text-xs pt-2">
          © {new Date().getFullYear()} Lotus Med Innovation LLC. <br /> All Rights Reserved.
        </div>
      </div>

      {/* ===== Desktop / Tablet (positioned) ===== */}
      {/* Contact Info - Far Left Center */}
      <div className="hidden md:block absolute bottom-40 left-6  z-10">
        <div className="w-full flex-col items-center text-center z-10 ">
          {/* ITEM */}
          <div className="py-2 md:py-4">
            <h2 className="text-white font-[300] text-[21px]">
              Contact Us
            </h2>
            <p className="text-[15px] pt-6">Lotus Med Innovation LLC</p>
          </div>
          {/* ITEM */}
          <div className="py-2 md:py-4  flex gap-1 justify-center">
            <h2 className="text-white text-[15px] font-[300] ">Address:</h2>
            <p className="text-[15px] flex flex-col text-center font-[300]">
              369 S Doheny Dr., PH 132<span>Beverly Hills, CA 90211</span>
              <span>U.S.A.</span>{" "}
            </p>
          </div>
          {/* ITEM */}
          <div className="py-2 md:py-1  flex gap-1 justify-center">
            <h2 className="text-white font-[300] text-[15px]">Email:</h2>
            <p className="text-[15px] text-[#fff] font-[300] email-contact">
              info@lotusmedinnovation.com
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form - Far Right Bottom */}
      <div className="hidden md:block absolute bottom-6 right-[33px] z-10 w-[min(80vw,441px)] overflow-visible">
        <div className="relative w-full overflow-hidden bg-white rounded-[24px] py-[39px] px-[45px]">
          <ContactFormFields
            phoneInputRef={desktopPhoneInputRef}
            {...formFieldProps}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-white text-xs z-10">
        © {new Date().getFullYear()} Lotus Med Innovation LLC. <br /> All Rights Reserved.
      </div>
    </section>
  );
};

export default Contact;
