import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { Github, Linkedin, Mail, Send, Terminal, MessageSquare, Check, AlertCircle, Code, ExternalLink } from 'lucide-react';

// Contact form schema with localized error messages
const getFormSchema = (language: string) => z.object({
  name: z.string()
    .min(2, language === 'en' ? 'Name is too short' : 'Le nom est trop court')
    .max(50, language === 'en' ? 'Name is too long' : 'Le nom est trop long'),
  email: z.string()
    .email(language === 'en' ? 'Invalid email format' : 'Format d\'email invalide'),
  message: z.string()
    .min(10, language === 'en' ? 'Message is too short' : 'Le message est trop court')
    .max(1000, language === 'en' ? 'Message is too long' : 'Le message est trop long'),
});

// Form inputs type
type FormInputs = z.infer<ReturnType<typeof getFormSchema>>;

export const Contact = () => {
  const { isDark } = useTheme();
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Initialize form with validation using current language
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitSuccessful } 
  } = useForm<FormInputs>({
    resolver: zodResolver(getFormSchema(language)),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  // Reset form after successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // Handle form submission
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log form data (in a real app, this would be an API call)
      console.log('Form submitted:', data);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(language === 'en' 
        ? 'Something went wrong. Please try again.' 
        : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update validator when language changes
  useEffect(() => {
    reset();
  }, [language, reset]);

  return (
    <section id="contact" className="relative z-40">
      <div className="container relative mx-auto px-6 py-6 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-sm shadow-lg dark:shadow-none border border-gray-300 dark:border-white/10">
        {/* VSCode style titlebar */}
        <div className="flex items-center gap-2 mb-3">
          <Code className="text-emerald-500 dark:text-blue-500 w-5 h-5" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {language === 'en' ? 'Contact.tsx' : 'Contact.tsx'}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left column: Social links + info panel */}
          <div className="lg:w-1/3">
            {/* Explorer panel */}
            <div className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg shadow-sm">
              <div className="p-2 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500 dark:text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'Contact Information' : 'Informations de Contact'}</span>
              </div>
              
              <div className="p-2 space-y-2">
                <a href="mailto:contact@example.com" 
                  className="flex items-center gap-3 p-1 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-md transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-emerald-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">contact@example.com</p>
                  </div>
                </a>
                
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-1 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-md transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">GitHub</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">github.com/yourusername</p>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-1 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-md transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Linkedin className="w-4 h-4 text-emerald-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">LinkedIn</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">linkedin.com/in/yourusername</p>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Status panel */}
            <div className="mt-4 bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg shadow-sm p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-emerald-500 dark:bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'Status: Available' : 'Statut: Disponible'}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'en' 
                  ? "I'm currently available for freelance work and new opportunities."
                  : "Je suis actuellement disponible pour des missions freelance et de nouvelles opportunités."}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {language === 'en' ? "Last updated: Today" : "Dernière mise à jour: Aujourd'hui"}
              </div>
            </div>
          </div>
          
          {/* Right column: Contact form */}
          <div className="lg:w-2/3">
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg shadow-sm overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-blue-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'Contact Form' : 'Formulaire de Contact'}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'en' ? 'awaiting input...' : 'en attente de saisie...'}
                </div>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                {/* VSCode-like comment */}
                <div className="text-gray-500 dark:text-gray-400 text-sm font-mono mb-3">
                  <div>// {language === 'en' ? 'Send me a message' : 'Envoyez-moi un message'}</div>
                  <div>// {language === 'en' ? 'I will get back to you as soon as possible' : 'Je vous répondrai dès que possible'}</div>
                </div>
                
                {/* Name and Email inputs side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === 'en' ? 'Name' : 'Nom'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/90 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-blue-500`}
                      placeholder={language === 'en' ? 'John Doe' : 'Jean Dupont'}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className={`w-full px-3 py-2 rounded-md border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/90 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-blue-500`}
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Message input */}
                <div>
                  <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Message' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message')}
                    className={`w-full px-3 py-2 rounded-md border ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/90 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-blue-500 font-mono text-sm`}
                    placeholder={language === 'en' ? '// Type your message here...' : '// Tapez votre message ici...'}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                {/* Submit button group */}
                <div className="flex justify-between items-center">
                  <div>
                    {submitSuccess && (
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-sm">{language === 'en' ? 'Message sent!' : 'Message envoyé !'}</span>
                      </div>
                    )}
                    
                    {submitError && (
                      <div className="flex items-center text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{submitError}</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium 
                      ${isSubmitting 
                        ? 'bg-gray-500 text-white cursor-not-allowed' 
                        : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-blue-500 dark:focus:ring-offset-gray-800'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {language === 'en' ? 'Sending...' : 'Envoi...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Send Message' : 'Envoyer'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Documentation panel */}
            <div className="mt-4 bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg shadow-sm p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-emerald-500 dark:text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'Quick Links' : 'Liens Rapides'}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <a href="#projects" className="px-3 py-2 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 hover:bg-white hover:border-emerald-300 dark:hover:bg-gray-800 dark:hover:border-blue-700/30 transition-colors">
                  {language === 'en' ? 'Projects' : 'Projets'}
                </a>
                <a href="#about" className="px-3 py-2 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 hover:bg-white hover:border-emerald-300 dark:hover:bg-gray-800 dark:hover:border-blue-700/30 transition-colors">
                  {language === 'en' ? 'About Me' : 'À Propos'}
                </a>
                <a href="#home" className="px-3 py-2 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 hover:bg-white hover:border-emerald-300 dark:hover:bg-gray-800 dark:hover:border-blue-700/30 transition-colors">
                  {language === 'en' ? 'Home' : 'Accueil'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;