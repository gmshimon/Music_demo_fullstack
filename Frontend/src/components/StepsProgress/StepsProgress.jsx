import React from "react";
import { CheckCircle } from "lucide-react";

const StepsProgress = ({ steps, currentStep }) => {
    return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                currentStep >= step.number ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-400"
              }`}
            >
              {currentStep > step.number ? <CheckCircle size={20} /> : <step.icon size={20} />}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-20 h-0.5 mx-4 transition-all duration-300 ${currentStep > step.number ? "bg-purple-500" : "bg-gray-700"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">{steps[currentStep - 1]?.title}</h1>
        <p className="text-gray-400">Step {currentStep} of {steps.length}</p>
      </div>
    </div>
  );
};

export default StepsProgress;
