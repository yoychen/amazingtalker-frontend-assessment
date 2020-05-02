import { Message } from 'element-ui';

export default (asyncFunc) => (...args) => asyncFunc(...args).catch(() => {
  Message.error('Oops something went wrong!');
});
