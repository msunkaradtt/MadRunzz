import { useState, useEffect } from 'react'

const useKeyboardControls = () => {
    const [keys, setKeys] = useState({ left: false, right: false, jump: false, crouch: false })

    useEffect(() => {
        const down = (e) => {
          switch (e.key) {
            case 'a': setKeys(k => ({ ...k, left: true })); break;
            case 'd': setKeys(k => ({ ...k, right: true })); break;
            case ' ': setKeys(k => ({ ...k, jump: true })); break;
            case 's': setKeys(k => ({ ...k, crouch: true })); break;
          }
        };
        const up = (e) => {
          switch (e.key) {
            case 'a': setKeys(k => ({ ...k, left: false })); break;
            case 'd': setKeys(k => ({ ...k, right: false })); break;
            case ' ': setKeys(k => ({ ...k, jump: false })); break;
            case 's': setKeys(k => ({ ...k, crouch: false })); break;
          }
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => {
          window.removeEventListener('keydown', down);
          window.removeEventListener('keyup', up);
        };
    }, [])

    return { left: keys.left, right: keys.right, jump: keys.jump, crouch: keys.crouch }
}

export default useKeyboardControls