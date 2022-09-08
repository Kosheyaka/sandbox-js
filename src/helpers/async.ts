interface WaiterParams<T> {
  functionToCall: (params?: any) => T;
  checkCallResult?: (result: T) => boolean;
  delayBeforeFirstAttempt?: number;
  delayBetweenAttempts?: number;
  maxAttempts?: number;
  rejectOnException?: boolean;
}

export const waiter = async <T>({
  functionToCall,
  checkCallResult = (v) => Boolean(v),
  delayBeforeFirstAttempt = 0,
  delayBetweenAttempts = 1000,
  maxAttempts = 5,
  rejectOnException = true,
}: WaiterParams<T>): Promise<T> => {
  let currentAttempt = 1;
  let timeoutId = null;
  return new Promise<T>((resolve, reject) => {
    const checkCondition = () => {
      let result: T;
      try {
        result = functionToCall();
        if (checkCallResult(result)) {
          clearTimeout(timeoutId);
          return resolve(result);
        }
      } catch (e) {
        if (rejectOnException) {
          clearTimeout(timeoutId);
          return reject(e.message);
        }
      }

      if (currentAttempt >= maxAttempts) {
        clearTimeout(timeoutId);
        return reject('Maximum attempts reached');
      }

      timeoutId = setTimeout(checkCondition, delayBetweenAttempts);
      currentAttempt++;
    };

    setTimeout(checkCondition, delayBeforeFirstAttempt);
  });
};

export const delay = async (timeout: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
