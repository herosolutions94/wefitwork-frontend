import Link from "next/link";

const ProfessionalTabs = () => {

  return (
    <div className="flex">
      <div className="colL">
        <div className="image">
            <img src="/images/tab_image1.png" alt=""/>
        </div>
      </div>
      <div className="colR">
        <div className="steps_works">
            <div className="inner_step">
                <h4>Join Our Platform</h4>
                <p>Create your professional profile by signing up with your details.</p>
            </div>
            <div className="inner_step">
                <h4>Subscription</h4>
                <p>Select a subscription plan that suits your needs. Subscribing unlocks your ability to offer services to buyers.</p>
            </div>
            <div className="inner_step">
                <h4>Set Your Availability</h4>
                <p>Customize your availability to match your schedule. Choose the days and times you'll be available for bookings.</p>
            </div>
            <div className="inner_step">
                <h4>Get Work</h4>
                <p>Once a buyer requests your service, you'll receive a notification.</p>
            </div>
            <div className="inner_step">
                <h4>Receive Reviews</h4>
                <p>Buyers can leave reviews to build your reputation. Positive reviews can help you attract more clients.</p>
            </div>
        </div>
        <div className="btn_blk">
            <Link href="" className="site_btn color min_wid">Become a Professional</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTabs;
