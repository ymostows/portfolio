import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { Github, Linkedin, Mail, Send, Terminal, MessageSquare, Check, AlertCircle, Code, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Initialisation d'EmailJS avec vos identifiants
emailjs.init("Z64fPz6_Zvc7NEJv_");

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
  const [deployStep, setDeployStep] = useState<'idle' | 'preparing' | 'deploying' | 'success' | 'error'>('idle');

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
    setDeployStep('preparing');
    
    try {
      // Préparation du déploiement
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDeployStep('deploying');
      
      // Envoi de l'email via EmailJS
      const templateParams = {
        name: data.name,
        email: data.email,
        message: data.message,
        time: new Date().toLocaleString(),
        to_email: 'pro.yann.mostowski@gmail.com'
      };

      await emailjs.send(
        'service_d0eaosr',
        'template_k8ne3gl',
        templateParams
      );
      
      setDeployStep('success');
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        setDeployStep('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setDeployStep('error');
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`container relative mx-auto px-6 py-6 rounded-xl backdrop-blur-sm shadow-lg dark:shadow-none border ${
          isDark 
            ? 'bg-black/30 border-white/10'
            : 'bg-white/30 border-gray-300'
        }`}
      >
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-100 text-emerald-600'} p-2 rounded-lg`}>
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {language === 'en' ? 'Contact me' : 'Contactez-moi'}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Left column: Social links + info panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/3 flex flex-col gap-4 h-full"
          >
            {/* Explorer panel */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-300/70 dark:border-gray-700/50 rounded-lg shadow-sm"
            >
              <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500 dark:text-blue-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'Contact Information' : 'Informations de Contact'}</span>
              </div>
              
              <div className="p-3 space-y-4">
                <a href="mailto:pro.yann.mostowski@gmail.com" 
                  className="flex items-center gap-3 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-emerald-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">pro.yann.mostowski@gmail.com</p>
                  </div>
                </a>
                
                <a href="https://github.com/HeedzZ" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">GitHub</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">github.com/HeedzZ</p>
                  </div>
                </a>
                
                <a href="https://www.linkedin.com/in/yann-mostowski-485833271/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Linkedin className="w-4 h-4 text-emerald-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">LinkedIn</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">linkedin.com/in/yann-mostowski</p>
                  </div>
                </a>
              </div>
            </motion.div>
            
            {/* Status panel */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-300/70 dark:border-gray-700/50 rounded-lg shadow-sm p-4 mt-auto"
            >
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
            </motion.div>
          </motion.div>
          
          {/* Right column: Contact form */}
          <div className="lg:w-2/3">
            <motion.div 
              whileHover={{ 
                scale: 1.01
              }}
              animate={{
                boxShadow: isDark 
                  ? "0 0 40px 10px rgba(37, 99, 235, 0.3)"
                  : "0 0 40px 10px rgba(16, 185, 129, 0.25)"
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-300/70 dark:border-gray-700/50 rounded-lg shadow-sm overflow-hidden relative z-10 h-full"
            >
              {/* Glowing effect pulsing - visible en permanence */}
              <motion.div 
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  willChange: 'box-shadow',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
                animate={{
                  boxShadow: isDark 
                    ? [
                        "0 0 15px 5px rgba(37, 99, 235, 0.3)",
                        "0 0 40px 20px rgba(37, 99, 235, 0.5)",
                        "0 0 15px 5px rgba(37, 99, 235, 0.3)"
                      ]
                    : [
                        "0 0 15px 5px rgba(16, 185, 129, 0.2)",
                        "0 0 40px 20px rgba(16, 185, 129, 0.4)",
                        "0 0 15px 5px rgba(16, 185, 129, 0.2)"
                      ]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  type: "tween"
                }}
              />
              
              {/* Toolbar */}
              <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-blue-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'Message Deployment' : 'Déploiement de Message'}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {deployStep === 'idle' && (language === 'en' ? 'Ready to deploy' : 'Prêt à déployer')}
                  {deployStep === 'preparing' && (language === 'en' ? 'Preparing deployment...' : 'Préparation du déploiement...')}
                  {deployStep === 'deploying' && (language === 'en' ? 'Deploying message...' : 'Déploiement du message...')}
                  {deployStep === 'success' && (language === 'en' ? 'Deployment successful!' : 'Déploiement réussi !')}
                  {deployStep === 'error' && (language === 'en' ? 'Deployment failed' : 'Échec du déploiement')}
                </div>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 flex flex-col h-[calc(100%-40px)]">
                {/* VSCode-like comment */}
                <div className="text-gray-500 dark:text-gray-400 text-sm font-mono mb-3">
                  <div>// {language === 'en' ? 'Prepare your message for deployment' : 'Préparez votre message pour le déploiement'}</div>
                  <div>// {language === 'en' ? 'All fields must be validated before deployment' : 'Tous les champs doivent être validés avant le déploiement'}</div>
                </div>
                
                {/* Name and Email inputs side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === 'en' ? 'Sender Name' : 'Nom de l\'expéditeur'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/90 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-blue-500`}
                      placeholder="Cillian Murphy"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {language === 'en' ? 'Sender Email' : 'Email de l\'expéditeur'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className={`w-full px-3 py-2 rounded-md border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/90 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-blue-500`}
                      placeholder="cillian.murphy@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Message textarea */}
                <div className="flex-1 flex flex-col">
                  <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Message Payload' : 'Contenu du Message'}
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={4}
                    className={`w-full px-3 py-2 rounded-md border ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white/90 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-blue-500 font-mono text-sm flex-1`}
                    placeholder={language === 'en' ? '// Type your message here...' : '// Tapez votre message ici...'}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                {/* Submit button */}
                <div className="flex justify-end mt-auto">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isSubmitting
                      ? 'bg-gray-500 text-white cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white'
                    }`}
                  >
                    {deployStep === 'idle' && (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Deploy Message' : 'Déployer le Message'}
                      </>
                    )}
                    {deployStep === 'preparing' && (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {language === 'en' ? 'Preparing...' : 'Préparation...'}
                      </>
                    )}
                    {deployStep === 'deploying' && (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {language === 'en' ? 'Deploying...' : 'Déploiement...'}
                      </>
                    )}
                    {deployStep === 'success' && (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Deployed!' : 'Déployé !'}
                      </>
                    )}
                    {deployStep === 'error' && (
                      <>
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Retry' : 'Réessayer'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;