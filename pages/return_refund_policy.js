import React from 'react'
import Layout from '../src/layout/Layout'
import PageBanner from '../src/components/PageBanner'
import Link from 'next/link'

const return_refund_policy = () => {
    return (
        <Layout>
            <PageBanner pageName={"Return and Refund Policy"} />

            <section className="about-section-two rel z-1">
                <div className="container">

                    <div className="col-lg-8 justify-center m-auto">
                        <div className="about-two-content pt-60 wow fadeInUp delay-0-4s">
                            <div className="section-title mb-35">
                                <h3>
                                    Thank you for shopping at sidham pharmacy.
                                </h3>
                                <p>Last updated: June 28, 2024</p>
                                <p>
                                    If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns. This Return and Refund Policy has been created with the help of the Return and Refund Policy Generator.
                                    <br />
                                    The following terms are applicable for any products that You purchased with Us.
                                </p>
                            </div>
                            <div className="section-title mb-35">
                                <span className="sub-title mb-20">Interpretation and Definitions</span>
                                <h5>Interpretation</h5>
                                <p>
                                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                                </p>
                                <h5>Definitions</h5>
                                <p>
                                    <b>For the purposes of this Return and Refund Policy:</b>
                                    <br />
                                    Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to sidham pharmacy, Head office- h.no 4072, sec 32, Shusant city, Kurukshetra, Haryana.
                                    <br />
                                    Goods refer to the items offered for sale on the Service.
                                    <br />
                                    Orders mean a request by You to purchase Goods from Us.
                                    <br />
                                    Service refers to the Website.
                                    <br />
                                    Website refers to sidham pharmacy, accessible from <Link href="https://sidhampharmacy.netlify.app/">https://sidhampharmacy.netlify.app/</Link>
                                    <br />

                                    You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                                    <br />
                                    <b>
                                        Your Order Cancellation Rights
                                        <br />
                                    </b>


                                    You are entitled to cancel Your Order within 7 days without giving any reason for doing so.
                                    <br />
                                    The deadline for cancelling an Order is 7 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.
                                    <br />
                                    In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:
                                    &nbsp;
                                    &nbsp;
                                    By email: Sidhampharmacy@gmail.com
                                    <br />
                                    We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.
                                </p>
                            </div>
                            <div className="section-title mb-35">
                                <span className="sub-title mb-20">Conditions for Returns</span>
                                <p>

                                    <b>In order for the Goods to be eligible for a return, please make sure that:</b>
                                    <br/>

                                    The Goods were purchased in the last 7 days
                                    The Goods are in the original packaging
                                    <br/>
                                    <b>The following Goods cannot be returned:</b>
                                    <br/>
                                    The supply of Goods made to Your specifications or clearly personalized.
                                    The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.
                                    The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.
                                    The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.
                                    <br/>
                                    We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.
                                    <br/>
                                    Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.
                                    Returning Goods
                                    <br/>
                                    You are responsible for the cost and risk of returning the Goods to Us.
                                    <br/> <b>You should send the Goods at the following address:</b>
                                    <br/>
                                    Head office- H.no. 4072, sec 32, Shusant city, Kurukshetra, Haryana.
                                    <br/>
                                    We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.
                                    <br/>
                                    <b>Gifts</b>
                                    <br/>
                                    If the Goods were marked as a gift when purchased and then shipped directly to you, You’ll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.
                                    <br/>
                                    If the Goods weren’t marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the refund to the gift giver.
                                    Contact Us
                                    <br/>
                                    If you have any questions about our Returns and Refunds Policy, please contact us:
                                    <br/>
                                    By email: Sidhampharmacy@gmail.com
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

export default return_refund_policy