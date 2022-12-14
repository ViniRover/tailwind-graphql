import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [createSubscribe, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(formEvent: FormEvent) {
    formEvent.preventDefault();

    await createSubscribe({
      variables: {
        name: fullName,
        email,
      },
    });

    navigate('/event');
  }

  return(
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Build an <strong className="text-blue-500">entire application</strong>, from scratch, with <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            In just one week you will master in practice one of the most used technologies and high demand to access the best opportunities on the market.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Sign up for free</strong>
          
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text" 
              placeholder="Your full name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              className="bg-gray-900 rounded px-5 h-14" 
              type="email" 
              placeholder="Type your e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={loading}
              className="mt-4 bg-green-500 py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              type="submit"
            >
              Secure my spot
            </button>
          </form>
        </div>
      </div>

      <img src="/src/assets/code.png" className="mt-10" alt="Code image" />
    </div>
  );
}