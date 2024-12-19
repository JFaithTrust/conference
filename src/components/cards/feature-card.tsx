import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-primary-800/50 backdrop-blur-md rounded-lg p-6 transition-all duration-300 hover:bg-primary-700/50 hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-primary-100">{description}</p>
    </div>
  );
}
