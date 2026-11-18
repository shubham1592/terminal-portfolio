import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BrandIcon from './BrandIcon';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Button } from './ui/button';
import emailjs from '@emailjs/browser';
import { links } from '@/data/profile';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_xdhyszj";
const EMAILJS_TEMPLATE_ID = "template_pygzv53";
const EMAILJS_PUBLIC_KEY = "y1nlhj4WSG6l4oA9e";

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    reason: '',
    wantReply: true,
    date: new Date().toLocaleString(),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState(prev => ({ ...prev, reason: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormState(prev => ({ ...prev, wantReply: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Client-side validation
    if (!formState.name.trim()) {
      setError('Please enter your name');
      setIsLoading(false);
      return;
    }

    if (!formState.email.trim()) {
      setError('Please enter your email');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (!formState.reason) {
      setError('Please select a reason for contact');
      setIsLoading(false);
      return;
    }

    if (!formState.message.trim()) {
      setError('Please enter your message');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        reason: formState.reason,
        message: formState.message,
        want_reply: formState.wantReply ? "Yes" : "No",
        date: new Date().toLocaleString(),
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );


      if (response.status === 200) {
        setIsSubmitted(true);
        setError('');
        
        // Reset form after successful submission
        setFormState({
          name: '',
          email: '',
          message: '',
          reason: '',
          wantReply: true,
          date: new Date().toLocaleString(),
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error('Error in form submission:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-green-500">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl"
      >
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 border border-green-500 rounded-md text-center mb-8 bg-black"
          >
            <p className="font-mono text-xl">
              <span className="text-green-400">&gt;</span> Message transmitted successfully.
            </p>
            <p className="font-mono mt-2 text-green-300 opacity-80">
              <span className="inline-block animate-pulse">_</span>
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 border border-red-500 rounded-md text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name" className="font-mono text-green-400">
                <span className="text-green-400">&gt;</span> name:
              </Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                placeholder="Ada Lovelace"
                className="w-full bg-black border-green-500 text-green-400 font-mono focus:ring-green-500 focus:border-green-500 focus:ring-2 placeholder:text-green-700/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-green-400">
                <span className="text-green-400">&gt;</span> email:
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                placeholder="ada@example.com"
                className="w-full bg-black border-green-500 text-green-400 font-mono focus:ring-green-500 focus:border-green-500 focus:ring-2 placeholder:text-green-700/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason" className="font-mono text-green-400">
                <span className="text-green-400">&gt;</span> reason-for-contact:
              </Label>
              <Select onValueChange={handleSelectChange} value={formState.reason}>
                <SelectTrigger className="w-full bg-black border-green-500 text-green-400 font-mono focus:ring-green-500 focus:border-green-500 focus:ring-2">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent className="bg-black border-green-500 text-green-400 font-mono">
                  <SelectItem value="full-time" className="focus:bg-green-900/30 focus:text-green-400">Full Time Opportunity</SelectItem>
                  <SelectItem value="internship" className="focus:bg-green-900/30 focus:text-green-400">Internship / Co-op</SelectItem>
                  <SelectItem value="collaboration" className="focus:bg-green-900/30 focus:text-green-400">Collaboration</SelectItem>
                  <SelectItem value="feedback" className="focus:bg-green-900/30 focus:text-green-400">Feedback</SelectItem>
                  <SelectItem value="just-saying-hi" className="focus:bg-green-900/30 focus:text-green-400">Just Saying Hi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="font-mono text-green-400">
                <span className="text-green-400">&gt;</span> message:
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                placeholder="Type your message here..."
                className="w-full min-h-[150px] bg-black border-green-500 text-green-400 font-mono focus:ring-green-500 focus:border-green-500 focus:ring-2 placeholder:text-green-700/50"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="want-reply" 
                checked={formState.wantReply}
                onCheckedChange={handleSwitchChange}
                className="data-[state=checked]:bg-green-500"
              />
              <Label htmlFor="want-reply" className="font-mono text-green-400">
                Would you like a reply?
              </Label>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-500 text-black font-bold py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 cursor-pointer shadow-[0_0_10px_rgb(var(--p-500)/0.3)] hover:shadow-[0_0_15px_rgb(var(--p-500)/0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⟳</span>
                  Sending...
                </span>
              ) : (
                <>
                  <span className="mr-2">&gt;</span> Send Message
                </>
              )}
            </Button>
          </form>
        )}
        
        <div className="mt-12 flex justify-center gap-6">
          {[
            { name: "LinkedIn", href: links.linkedin, label: "LinkedIn profile" },
            { name: "GitHub", href: links.github, label: "GitHub profile" },
            { name: "Email", href: `mailto:${links.email}`, label: `Email ${links.email}` },
          ].map((c) => (
            <a
              key={c.name}
              href={c.href}
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="brand-host p-2"
              aria-label={c.label}
              title={c.label}
            >
              <BrandIcon name={c.name} className="h-9 w-9" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactSection;
