import { useState } from "react";
import { React } from "react";
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";

function Heroform(props) {

    // ========= result success message =========
    const Result = () => {
        return <div class="mt-3 alert alert-success" role="alert">
            Your Message has been sent. we will back to you soon.
        </div>
    }
    const [result, showresult] = useState(false);

    // ========= react hook form validation function =========
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: { yes_i_understand: false }
    });

    //========= email js function =========
    const sendEmail = (formData) => {
        emailjs
            .send(
                "service_5qjj256",
                "template_loiw1nh",
                formData,
                "user_9vGftkoNZiOYOvLBTZCvP"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        //reset form on click
        reset();

        //show warning message
        setTimeout(() => {
            showresult(true);
        }, 500);

        setTimeout(() => {
            showresult(false);
        }, 4000);
    };

    return <>
        <div class="heroformOuter">
            <div class="heroform">
                <h3><span>Quick</span> Contact Us</h3>
                <form onSubmit={handleSubmit(sendEmail)} >
                    <div class="form-group mb-3">
                        <input {...register("name", { required: "Name is Required", minLength: { value: 4 } })}
                            type="text"
                            class="form-control" name="name" placeholder="Your name" />
                        {errors.name && (
                            <div className="invalid-feedback d-block">
                                Please fill your First Name
                            </div>
                        )}
                    </div>

                    <div class="form-group mb-3">
                        <input {...register("email", {
                            required: "email is Required",
                            minLength: { value: 10 }
                        })} class="form-control" name="email" placeholder="Email" />
                        {errors.email && (
                            <div className="invalid-feedback d-block">
                                Please enter your valid email address
                            </div>
                        )}
                    </div>

                    <div class="form-group mb-3">
                        <input
                            {...register("subject", {
                                required: "email is Required",
                                minLength: { value: 10 }
                            })}
                            type="text" class="form-control"
                            name="subject" placeholder="Subject"
                        />

                        {errors.subject && (
                            <div className="invalid-feedback d-block">
                                Min 10 characters required.
                            </div>
                        )}
                    </div>


                    <div class="form-group mb-3">
                        <textarea
                            {...register("message", { required: "message is Required", minLength: { value: 20 } })}
                            class="form-control" name="message" placeholder="Message">

                        </textarea>
                        {errors.message && (
                            <div className="invalid-feedback d-block">
                                Min 30 characters required.
                            </div>
                        )}
                    </div>

                    <div class="form-group">
                        <input type="submit" class="mainBtn border-0 px-5" value="Send Us" />
                    </div>
                    <div className="form-group mt-3">
                        {result ? <Result /> : null}
                    </div>
                </form>
            </div>
        </div>
    </>
}
export default Heroform;