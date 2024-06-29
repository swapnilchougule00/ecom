import React from 'react'
import Layout from '../src/layout/Layout'
import PageBanner from '../src/components/PageBanner'
import Link from 'next/link'

const shipping_policy = () => {
    return (
        <Layout>
            <PageBanner pageName={"Shipping Policy"} />

            <section className="about-section-two rel z-1">
                <div className="container">

                    <div className="col-lg-8 justify-center m-auto">
                        <div className="about-two-content pt-60 wow fadeInUp delay-0-4s">
                            <div className="section-title mb-35">

                                <p><Link href={"https://sidhampharmacy.netlify.app/ "}>Sidham pharmacy</Link> is committed to excellence, and the full satisfaction of our customers. <Link href={"https://sidhampharmacy.netlify.app/ "}>Sidham pharmacy</Link>  proudly offers shipping services. Be assured we are doing everything in our power to get your order to you as soon as possible. Please consider any holidays that might impact delivery times. <Link href={"https://sidhampharmacy.netlify.app/ "}>Sidham pharmacy</Link> also offers same day dispatch.
                                </p>
                            </div>
                            <div className="section-title mb-35">

                                <span className="sub-title mb-20">SHIPPING</span>
                                <p>
                                    All orders for our products are processed and shipped out in 4-10 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders,
                                    shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in the shipment of your order, we will contact you via email.
                                </p>
                            </div>
                            <div className="section-title mb-35">

                                <span className="sub-title mb-20">WRONG ADDRESS DISCLAIMER</span>
                                <p>
                                    It is the responsibility of the customers to make sure that the shipping address entered is correct. We do our best to speed up processing and shipping time, so there is always a small window to
                                    correct an incorrect shipping address. Please contact us immediately if you believe you have provided an incorrect shipping address.
                                </p>
                            </div>
                            <div className="section-title mb-35">

                                <span className="sub-title mb-20">UNDELIVERABLE ORDERS</span>
                                <p>

                                    Orders that are returned to us as undeliverable because of incorrect shipping information are subject to a restocking fee to be determined by us.
                                </p>
                            </div>
                            <div className="section-title mb-35">

                                <span className="sub-title mb-20">LOSTSTOLEN PACKAGES</span>
                                <p>


                                    <Link href={"https://sidhampharmacy.netlify.app/ "}>Sidham pharmacy</Link> is not responsible for lost or stolen packages. If your tracking information states that your package was delivered to your address and you have not received it, please report to the local authorities.
                                </p>
                            </div>
                            <div className="section-title mb-35">

                                <span className="sub-title mb-20">
                                    RETURN REQUEST DAYS
                                </span>
                                <p>


                                    <Link href={"https://sidhampharmacy.netlify.app/ "}>Sidham pharmacy</Link> allows you to return its item (s) within a period of 3 days. Kindly be advised that the item (s) should be returned unopened and unused.
                                </p>
                            </div>
                            <div className="section-title mb-35">

                                <span className="sub-title mb-20">
                                    OUT OF STOCK ITEM PROCESS
                                </span>
                                <p>


                                    <Link href={"https://sidhampharmacy.netlify.app/ "}>Sidham pharmacy</Link>
                                    <Link href={"https://sidhampharmacy.netlify.app/ "}>Sidham pharmacy</Link>  has the following options in the event there are items which are out of stock <Link href={"https://sidhampharmacy.netlify.app/ "}>Sidham pharmacy</Link>  Wait for all items to be in stock before dispatching.
                                </p>
                            </div>
                            <div className="section-title mb-35">

                                <span className="sub-title mb-20">
                                    IMPORT DUTY AND TAXES
                                </span>
                                <p>

                                    When dealing with <Link href={"https://sidhampharmacy.netlify.app/ "}>Sidham pharmacy</Link> you have the following options when it comes to taxes as well as import duties You will be required to settle the requisite fees when the items are arriving
                                    in the destination country.
                                </p>
                            </div>
                            <div className="section-title mb-35">

                                <span className="sub-title mb-20">
                                    ACCEPTANCE
                                </span>
                                <p>


                                    By accessing our site and placing an order you have willingly accepted the terms of this Shipping Policy.


                                </p>
                            </div>
                            <div className="section-title mb-35">

                                <span className="sub-title mb-20">
                                    CONTACT INFORMATION
                                </span>
                                <p>

                                    In the event you have any questions or comments please reach us via the following contacts Email – Sidhampharmacy@gmail.com


                                </p>
                            </div>


                        </div>
                    </div>
                    {/* </div> */}
                </div>
                <div className="about-shapes">
                    <img src="assets/images/shapes/about-shape1.png" alt="Shape" />
                    <img src="assets/images/shapes/about-shape2.png" alt="Shape" />
                </div>
            </section>
        </Layout>
    )
}

export default shipping_policy