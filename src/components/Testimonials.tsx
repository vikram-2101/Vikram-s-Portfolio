import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "CTO, TechStart",
    quote: "Harshit delivered our MVP in just 2 weeks. Incredible speed without compromising quality.",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Product Lead, InnovateCo",
    quote: "The AI features he built transformed our product. Users love the intelligent recommendations.",
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Founder, DataFlow",
    quote: "Best developer I've worked with. Clean code, clear communication, always delivers.",
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Engineering Manager",
    quote: "Harshit's full-stack expertise saved us months of development time.",
  },
];

const TestimonialCard = ({
  testimonial,
  onSelect,
}: {
  testimonial: Testimonial;
  onSelect: (testimonial: Testimonial) => void;
}) => {
  return (
    <motion.div
      layoutId={`testimonial-${testimonial.id}`}
      onClick={() => onSelect(testimonial)}
      className="flex-shrink-0 w-[350px] p-6 bg-card border border-border rounded-lg cursor-pointer relative hover:z-50"
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-foreground font-body text-base mb-4 leading-relaxed line-clamp-3">
        "{testimonial.quote}"
      </p>
      <div>
        <p className="font-display font-bold text-foreground uppercase tracking-tight text-sm">
          {testimonial.name}
        </p>
        <p className="text-muted-foreground text-xs font-body">
          {testimonial.role}
        </p>
      </div>
    </motion.div>
  );
};

const TestimonialModal = ({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 bg-card border-border overflow-hidden">
        <VisuallyHidden.Root>
          <DialogTitle>{testimonial.name}</DialogTitle>
        </VisuallyHidden.Root>
        <motion.div layoutId={`testimonial-${testimonial.id}`} className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-display text-2xl font-bold text-foreground uppercase tracking-tight mb-1">
                {testimonial.name}
              </p>
              <p className="text-muted-foreground text-sm font-body">
                {testimonial.role}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-foreground font-body text-lg leading-relaxed">
            "{testimonial.quote}"
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Double the testimonials for seamless loop
  const duplicatedTestimonials = [...mockTestimonials, ...mockTestimonials];

  return (
    <section className="py-16 overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <span className="text-muted-foreground text-xs font-body tracking-[0.3em] uppercase mb-4 block">
            What People Say
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground uppercase tracking-tight">
            Testimonials
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div 
        className="relative py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex gap-6 animate-marquee"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              testimonial={testimonial}
              onSelect={setSelectedTestimonial}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedTestimonial && (
          <TestimonialModal
            testimonial={selectedTestimonial}
            onClose={() => setSelectedTestimonial(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
