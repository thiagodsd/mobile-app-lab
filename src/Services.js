import React from "react";

function ServicesSection({ title, items }) {
    return (
        <section className="menu-section">
            <h3>{title}</h3>
            <div className="menu-items">
                {items.map((item) => (
                    <div key={item.name} className="menu-item" data-aos="fade-up">
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            {/* if price lenght > 0 print $ price, else print none */}
                            {item.price.length > 0 ? <p className="price"><b>$</b> {item.price}</p> : <p className="price"></p>}
                            {/* if price is true print $ price, else print none */}
                            {/* <p className="price"><b>$</b> {item.price}</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ServicesSection;
