export function CheckoutStepper({ currentStep }: { currentStep: number }) {
    const steps = ['Shipping', 'Payment', 'Review']

    return (
        <nav className="mb-8">
            <ol className="flex items-center gap-4">
                {steps.map((step, index) => (
                    <li key={step} className="flex-1">
                        <div className="flex flex-col items-center">
              <span className={`flex items-center justify-center w-8 h-8 rounded-full 
                ${index <= currentStep ? 'bg-green-700 text-white' : 'bg-muted'}`}>
                {index + 1}
              </span>
                            <span className={`mt-2 text-sm ${
                                index <= currentStep ? 'font-medium' : 'text-muted-foreground'
                            }`}>
                {step}
              </span>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}