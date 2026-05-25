import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Flame, Check, ShieldCheck, Zap, Bike } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { REVIEWS } from '../data';

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Flame size={24} className="text-theoh-orange" />,
      title: "Morning Fresh",
      desc: "Prepared fresh each morning starting at 5:00 AM — never stored overnight or pre-packaged."
    },
    {
      icon: <ShieldCheck size={24} className="text-theoh-green" />,
      title: "100% Healthy",
      desc: "Zero preservatives, zero refined sugar, and absolutely no artificial colorings or flavorings."
    },
    {
      icon: <Zap size={24} className="text-[#F57F17]" />,
      title: "Custom Built",
      desc: "You pick your oats base and layering toppings. Your bowl, your ingredients, your rules."
    },
    {
      icon: <Bike size={24} className="text-[#3F51B5]" />,
      title: "Fast Delivery",
      desc: "Fresh morning deliveries directly to your doorstep in Hyderabad before 9:00 AM."
    },
  ];

  const combos = [
    {
      name: "The Power Bowl",
      base: "High Protein Oats Chocolate",
      addons: ["Almonds", "Peanut Butter", "Banana"],
      price: 235,
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80",
      tag: "Best for Gym"
    },
    {
      name: "The Fruit Paradise",
      base: "Fruit Oats",
      addons: ["Strawberry", "Blueberry", "Mango"],
      price: 195,
      image: "https://images.unsplash.com/photo-1614961909372-5e11b6a0ae54?w=400&q=80",
      tag: "Vitamins Rich"
    },
    {
      name: "The Nut Crunch",
      base: "Muesli",
      addons: ["All Mix Nuts", "Dark Chocolate Peanut Butter", "Chia Seeds"],
      price: 250,
      image: "https://images.unsplash.com/photo-1504308805006-0f7a5f1adea4?w=400&q=80",
      tag: "High Energy"
    },
  ];

  return (
    <div className="bg-theoh-beige overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-theoh-orange bg-theoh-lightOrange px-3.5 py-1.5 rounded-full">
            Why THEOH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-theoh-brown tracking-tight mt-4">
            Nourishing your body, crafted with love
          </h2>
          <p className="text-theoh-muted text-sm sm:text-base mt-3">
            Say goodbye to heavy, oily breakfasts. THEOH brings premium, fiber-rich morning fuel straight from our clean local kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={feature.title}
              className="bg-theoh-cream p-8 rounded-3xl border border-theoh-border/60 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="p-3.5 rounded-2xl bg-theoh-beige inline-block mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-theoh-brown mb-2">{feature.title}</h3>
              <p className="text-theoh-muted text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Favorites / Combos Section */}
      <section className="bg-theoh-cream border-y border-theoh-border/40 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-theoh-green bg-[#E8F5E9] text-[#2E7D32] px-3.5 py-1.5 rounded-full">
              Popular Combos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-theoh-brown tracking-tight mt-4">
              Our Customer Favorites
            </h2>
            <p className="text-theoh-muted text-sm sm:text-base mt-3">
              Not sure how to customize? Try one of our house favorites meticulously layered for flavor and nutritional density.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {combos.map((combo, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                key={combo.name}
                className="bg-white rounded-3xl overflow-hidden border border-theoh-border/50 shadow-premium hover:shadow-premium-hover transition-all group"
              >
                <div
                  className="h-56 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${combo.image})` }}
                >
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-theoh-orange text-xs font-black uppercase px-3 py-1 rounded-full shadow-sm">
                    {combo.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-theoh-brown mb-1 group-hover:text-theoh-orange transition-colors">
                    {combo.name}
                  </h3>
                  <p className="text-xs font-semibold text-theoh-orange uppercase mb-3">
                    Base: {combo.base}
                  </p>
                  <p className="text-[#7E6C5A] text-xs leading-relaxed mb-6 font-medium">
                    Toppings: {combo.addons.join(' • ')}
                  </p>
                  <div className="flex justify-between items-center border-t border-theoh-border/30 pt-4">
                    <span className="text-2xl font-black text-theoh-brown">₹{combo.price}</span>
                    <button
                      onClick={() => navigate('/menu')}
                      className="bg-theoh-lightOrange hover:bg-theoh-orange text-theoh-orange hover:text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all group-hover:scale-105"
                    >
                      Customize →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-theoh-orange bg-theoh-lightOrange px-3.5 py-1.5 rounded-full">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-theoh-brown tracking-tight mt-4">
            Hear From Our Healthy Community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {REVIEWS.map((review, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={review.name}
              className="bg-theoh-cream p-8 rounded-3xl border border-theoh-border/60 shadow-premium flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4 text-[#F4A61D]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F4A61D" />
                  ))}
                </div>
                <p className="text-theoh-text/80 text-sm sm:text-base italic leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-theoh-orange text-white text-sm font-bold flex items-center justify-center shadow">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-theoh-brown">{review.name}</h4>
                  <p className="text-[11px] font-semibold text-theoh-muted tracking-wider uppercase">
                    {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-gradient-to-r from-theoh-orange to-[00000] py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-92 h-92 bg-white/5 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-16 -mb-16" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black mb-4 text-[#004700]">
            Ready for a healthier morning?
          </h2>
          <p className="text-[#004700] text-base sm:text-lg mb-8 font-light">
            Build your tailored breakfast oatmeal bowl or artisanal toast in under 2 minutes. Delighted morning energy guaranteed!
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-white text-theoh-orange hover:bg-theoh-beige font-black px-8 py-4 rounded-full shadow-premium hover:shadow-premium-hover active:scale-98 transition-all inline-flex items-center gap-2"
          >
            Start Building Now →
          </button>
        </div>
      </section>
    </div>
  );
}
