import { useRef } from "react";
import classes from "./NewsletterRegistration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const emailData = emailInputRef.current.value;
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: emailData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            ref={emailInputRef}
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
