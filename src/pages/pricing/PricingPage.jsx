import React from 'react'
import './pricing_page.css'
import hero from '../../assets/images/hero.png';
import PaypalCheckoutBtn from '../../components/PaypalCheckoutBtn';

function PricingPage() {
    const premeiumProduct = {
        description:"test",
        price:"999.00"
    }
  return (
    <div className='container'>
        <div className="pricing-plan-basic">
            <div className="pricing-content">
                <h1 className="premum-text">Basic</h1>
                <h2 className="price-text">$0<span class="text-small">/ month</span></h2>
                <div className="divider"></div>
                <ul className="benefits">
                    <li className="options">✅Lorem ipsum dolor sit amet</li>
                    <li className="options">✅Sed ut perspiciatis</li>
                    <li className="options">✅At vero eos et accusamus</li>
                    <li className="options basic"> Nam libero tempore</li>
                    <li className="options basic">Sed ut perspiciatis</li>
                    <li className="options basic">Sed ut perspiciatis</li>
                </ul>
            </div>
        </div>
        <div className="pricing-plan-premium">
            <div className="pricing-content">
                <h1 className="premum-text">Premium</h1>
                <h2 className="price-text">$999<span class="text-small">/ month</span></h2>
                <div className="divider"></div>
                <ul className="benefits">
                    <li className="options">✅Lorem ipsum dolor sit amet</li>
                    <li className="options">✅Sed ut perspiciatis</li>
                    <li className="options">✅At vero eos et accusamus</li>
                    <li className="options">✅Nam libero tempore</li>
                    <li className="options">✅Sed ut perspiciatis</li>
                    <li className="options">✅Sed ut perspiciatis</li>
                </ul>

                <PaypalCheckoutBtn ></PaypalCheckoutBtn>
            </div>
        </div>
    </div>
  )
}

export default PricingPage