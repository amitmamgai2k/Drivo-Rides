import {useState} from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock,MessageSquare,User, LifeBuoy, Smartphone, ChevronRight} from 'lucide-react';
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import axios from 'axios';


const Support = (props) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");


  if (!props.Contact) return null;

  const supportChannels = [
    {
      icon: LifeBuoy,
      title: "Help Center",
      description: "Find answers in our knowledge base",
      action: "Visit Help Center",
      link: "#"
    },

    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant messaging with our team",
      action: "Start Chat",
      link: "#"
    }
  ];
 const handleSubmit = async (e)=>{
  e.preventDefault();
  const userData = {
    name: name,
    email: email,
    message: message,
    mobileNumber: mobileNumber
};
try{
 const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/send-message`, userData);
if (response.status === 200) {
  toast.success('Message sent successfully');



 }
}
catch(error){
 console.error('Error sending message:', error);
 toast.error('Failed to send message. Please try again.');
}
 setname('');
 setemail('');
 setmessage('');
 setmobileNumber('');




 }
  return (
    <div className="fixed inset-0 bg-white z-30 overflow-auto animate-in slide-in-from-right">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => props.toggleContact(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Contact Us</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Hero Section */}
        <section className="space-y-3 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            We're Here to Help
          </h2>
          <p className="text-gray-600 text-lg">
            Reach out to us 24/7 through any of these channels
          </p>
        </section>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-3 bg-blue-50 rounded-xl space-y-2">
            <div className='flex gap-3'>
            <Phone className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Call Us</h3></div>
            <p className="text-gray-600">24/7 customer support</p>
            <div className="text-medium font-medium text-blue-600">+91 7011343809</div>
          </div>

          <div className="p-3 bg-green-50 rounded-xl space-y-2">
            <div className='flex gap-3'>
            <Mail className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold">Email Us</h3></div>
            <p className="text-gray-600">Typically responds within 2 hours</p>
            <div className="text-medium font-medium text-green-600">support@drivo.com</div>
          </div>

          <div className="p-3 bg-purple-50 rounded-xl space-y-2">
            <div className='flex gap-3'>
            <MapPin className="w-8 h-8 text-purple-600" />
            <h3 className="text-lgfont-semibold">Visit Us</h3></div>
            <p className="text-gray-600">Corporate headquarters</p>
            <div className="text-medium font-medium text-purple-600">
              Bijwasan Delhi, India<br/>

            </div>
          </div>
        </div>

        {/* Contact Form */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-500" />
            <h3 className="text-2xl font-semibold">Send a Message</h3>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            {/* mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={mobileNumber}
                  onChange={(e) => setmobileNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your mobile Number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Send Message
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </section>

        {/* Support Channels */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold">Other Support Options</h3>
          <div className="space-y-4">
            {supportChannels.map((channel, index) => (
              <a
                key={index}
                href={channel.link}
                className="flex items-center justify-between p-4 border rounded-xl hover:border-blue-200 transition-all"
              >
                <div className="flex items-center gap-4">
                  <channel.icon className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">{channel.title}</h4>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>
            ))}
          </div>
        </section>

        {/* Map */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold">Our Location</h3>
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.16993635749!2d77.04633068362813!3d28.53461143965374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b4653b9a801%3A0x59a03f189c13005!2sHCR%20Institute!5e0!3m2!1sen!2sin!4v1737830489924!5m2!1sen!2sin"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Drivo Rides. All rights reserved.
        </div>
        <div className="mt-6">
                   <p className="text-xs text-gray-500 text-center mt-6">
                                       By signing up, you agree to our{' '}
                                       <Link to='/Drivo-Rides-Terms-and-Conditions' className="text-blue-600 hover:underline">Terms of Service</Link>{' '}
                                       and{' '}
                                       <Link to ='/Drivo-Rides-privacy-policy' className="text-blue-600 hover:underline">Privacy Policy</Link>
                                   </p>
                </div>
      </div>
    </div>
  );
};

export default Support;