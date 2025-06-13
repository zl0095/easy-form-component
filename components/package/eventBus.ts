// eventBus.ts
import { onUnmounted } from 'vue';

const events = new Map<string, Function[]>();

export const eventBus = {
    on(event: string, callback: Function) {
        if (!events.has(event)) {
            events.set(event, []);
        }
        events.get(event)?.push(callback);
    },
    off(event: string, callback: Function) {
        const listeners = events.get(event);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    },
    emit(event: string, ...args: any[]) {
        const listeners = events.get(event);
        if (listeners) {
            listeners.forEach((listener) => {
                listener(...args);
            });
        }
    },
};

export function useEventBus() {
    const onEvent = (event: string, callback: Function) => {
        eventBus.on(event, callback);
        onUnmounted(() => {
            eventBus.off(event, callback);
        });
    };

    return { onEvent };
}