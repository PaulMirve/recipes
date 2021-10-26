export function Emoji(): PropertyDecorator {
    return function (target: any, key) {
        let val = target[key];

        const getter = () => {
            return val;
        }

        const setter = (next: string) => {
            val = `💩${next}💩`
        }

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}