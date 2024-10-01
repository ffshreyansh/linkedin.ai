import ReactDOM from 'react-dom/client';
import App from './App.tsx';

export default defineContentScript({
    matches: ['*://*.linkedin.com/messaging/*'],
    cssInjectionMode: 'ui',
    async main(ctx) {
        const ui = await createIntegratedUi(ctx, {
            position: 'inline',
            onMount: (container) => {
                console.log("Container", container);

                const root = ReactDOM.createRoot(container);
                console.log("Root created", root);

                root.render(<App />);
                return root;
            },
            onRemove: (root) => {
                root?.unmount();
            },
        });

        ui.mount();


    },
});
