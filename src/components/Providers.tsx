'use client';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from 'react-redux';
import store, { persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
		<PayPalScriptProvider options={{ 
			clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
			intent: 'capture',
			currency: 'USD' 
			}}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{children}
				</PersistGate>
    	</Provider>
		</PayPalScriptProvider>)
}

export default Providers;