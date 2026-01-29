import React from 'react';
import PageLayout from '../layouts/PageLayout';
import assets from '../assets/assets';


const OnlinePayment: React.FC = () => {
    return (
        <PageLayout title="Online Payment" sidebarType="none">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                    {/* Header Section */}
                    <div className="bg-blue-600 text-white p-8 text-center">
                        <h2 className="text-3xl font-bold mb-2">Secure Online Payment</h2>
                        <p className="text-blue-100">Quick, safe, and convenient way to pay for your Tally services.</p>
                    </div>

                    <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">

                        {/* Information Section */}
                        <div className="flex-1 space-y-6">
                            <h3 className="text-2xl font-bold text-gray-800">Payment Options</h3>
                            <p className="text-gray-600 leading-relaxed">
                                You can make payments via Bank Transfer or by scanning the QR code using any UPI app.
                            </p>

                            {/* Bank Details Card */}
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-100 w-16 h-16 rounded-full opacity-50"></div>
                                <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                                    <span className="text-xl">🏦</span> Bank Transfer Details
                                </h4>
                                <div className="space-y-2 text-blue-900">
                                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-200 pb-1 last:border-0 last:pb-0">
                                        <span className="font-semibold text-xs uppercase tracking-wider opacity-70">Account Name</span>
                                        <span className="font-medium">Mittal Online Services</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-200 pb-1 last:border-0 last:pb-0">
                                        <span className="font-semibold text-xs uppercase tracking-wider opacity-70">Bank Name</span>
                                        <span className="font-medium">HDFC Bank</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-200 pb-1 last:border-0 last:pb-0">
                                        <span className="font-semibold text-xs uppercase tracking-wider opacity-70">Account No.</span>
                                        <span className="font-mono font-bold text-lg">50200027479131</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-200 pb-1 last:border-0 last:pb-0">
                                        <span className="font-semibold text-xs uppercase tracking-wider opacity-70">IFSC Code</span>
                                        <span className="font-mono font-bold">HDFC0000655</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-blue-200 pb-1 last:border-0 last:pb-0">
                                        <span className="font-semibold text-xs uppercase tracking-wider opacity-70">Branch</span>
                                        <span className="font-medium">Sheel Palace, Meerut, U.P.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm text-yellow-800">
                                <strong>Note:</strong> After making the payment, please share the screenshot & transaction ID with our support team.
                            </div>
                        </div>

                        {/* QR Code Placeholder Section */}
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="bg-gray-100 rounded-xl shadow-md border-2 border-dashed border-gray-300 w-64 h-64 flex items-center justify-center overflow-hidden relative">
                                <img
                                    src={assets.qrCode}
                                    alt="Payment QR Code"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="mt-4 text-center font-bold text-gray-800">Scan to Pay</p>
                            <p className="text-sm text-gray-500">Mittal Online Services</p>
                        </div>

                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default OnlinePayment;
