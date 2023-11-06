import Link from "next/link";

const BuyerTabs = () => {

  return (
    <div className="flex">
      <div className="colL">
        <div className="image">
            <img src="/images/tab_image2.jpg" alt=""/>
        </div>
      </div>
      <div className="colR">
        <div className="steps_works">
            <div className="inner_step">
                <h4>Search for Services</h4>
                <p>Enter your location and the service you need. Our platform will display a list of nearby professionals.</p>
            </div>
            <div className="inner_step">
                <h4>Browse Profiles</h4>
                <p>Explore the profiles of professionals to learn more about their skills, experience, and reviews from other buyers.</p>
            </div>
            <div className="inner_step">
                <h4>Select a Professional & Request Service</h4>
                <p>Choose the professional that best matches your needs. Check their availability and request their service.</p>
            </div>
            <div className="inner_step">
                <h4>Receive Service & Make Payment</h4>
                <p>Send a service request to the chosen professional. They'll receive a notification and can accept or decline your request.</p>
            </div>
            <div className="inner_step">
                <h4>Leave a Review</h4>
                <p>After the service is complete, you can leave a review for the professional to help other buyers make informed decisions.</p>
            </div>
        </div>
        <div className="btn_blk">
            <Link href="" className="site_btn color min_wid">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerTabs;
