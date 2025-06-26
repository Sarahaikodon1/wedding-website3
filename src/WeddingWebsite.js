import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function WeddingWebsite() {
  const [formData, setFormData] = useState({ name: '', guests: 1, dietary: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const downloadCard = () => {
    const canvas = document.getElementById('qr-code').querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `${formData.name.replace(/\s+/g, '_')}_AccessCard.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-green-100 text-purple-900 p-8 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-800">Glory & Femi's Wedding</h1>
        <p className="text-lg mt-2">Join us on February 14, 2026 in Igando, Lagos</p>
      </header>

      <section className="text-center mb-12">
        <img
          src="/couple-photo.jpg"
          alt="Couple"
          className="mx-auto w-64 h-64 object-cover rounded-full border-4 border-purple-500"
        />
        <p className="mt-4 text-xl">
          Femi and Glory first crossed paths in the unlikeliest of places — a dusty Lagos bookstore tucked between two busy streets...
        </p>
      </section>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white max-w-xl mx-auto p-6 rounded-xl shadow-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-purple-700">RSVP</h2>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              className="w-full p-2 border border-purple-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Number of Guests</label>
            <input
              type="number"
              name="guests"
              min="1"
              max="5"
              onChange={handleChange}
              className="w-full p-2 border border-purple-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dietary Needs</label>
            <input
              type="text"
              name="dietary"
              onChange={handleChange}
              className="w-full p-2 border border-purple-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Submit RSVP
          </button>
        </form>
      ) : (
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-purple-700">Thank you, {formData.name}!</h2>
          <p>Your RSVP has been recorded.</p>
          <div id="qr-code" className="inline-block p-4 border rounded shadow bg-white">
            <QRCodeSVG
              value={`Name: ${formData.name}\nGuests: ${formData.guests}`}
              size={200}
              includeMargin
            />
            <p className="mt-2 text-sm text-purple-700">Present this code at the wedding entrance</p>
          </div>
          <button
            onClick={downloadCard}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Download Access Card
          </button>
        </div>
      )}
    </div>
  );
}
