
const uuidv4 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    c => {
        const r = Math.random() * 16 | 0;
        return c == 'x' ? r : (r & 0x3 | 0x8);
    });
);

export default function(originalDependencies) {

    let dependencies;
    let injectionLock;
    const initializeDependencies = () => dependencies = { ...originalDependencies };

    return {

        inject(newDependencies, maybeInjectionLock) {

            if(injectionLock && injectionLock !== maybeInjectionLock)
                throw new Error(`Dependencies are locked by injector: ${injectionLock}`);
            injectionLock = uuidv4();
            dependencies = { ...dependencies, ...newDependencies };
            const teardown = () => initializeDependencies();
            teardown.lock = injectionLock;
            return teardown;

        }

    };

};