/**
 * 登録済みMadoが開かれた窓であるときに用いる修飾
 */
export default class AppDecorator {
  constructor(context, client) {
    this.context = context;
    this.client  = client;
    // これ大事！！
    this.context.document.body.style.position = 'relative';
  }
  decorate({entry, configs}) {
    this.context.document.body.style.left = `-${entry.mado.offset.left}px`;
    this.context.document.body.style.top  = `-${entry.mado.offset.top}px`;
    if (!entry.decorated) this.resize(entry.mado.zoom);
    this.advanced(entry.mado);
    this.context.onbeforeunload = () => configs.onbeforeunload ? true : null;
    this.interval = this.context.setInterval(() => {
      this.client.message('/mado/position:update', {
        x: this.context.screenX,
        y: this.context.screenY,
      });
    }, 30*1000); // 30秒おきにポジションを記憶
    // TODO: オプションでスクロールそのものはできるようにする. cf) ::-webkit-scrollbar
    this.context.document.querySelector('html').style.overflow = 'hidden'; // スクロールバー消す
  }
  resize(zoom) {
    const innerWidth  = Math.floor(this.context.innerWidth * zoom);
    const innerHeight = Math.floor(this.context.innerHeight * zoom);
    this.client.message('/mado:resize-by', {
      w: this.context.outerWidth -  innerWidth,
      h: this.context.outerHeight - innerHeight - 1, // XXX なにこれw
    });
  }
  advanced(mado) {
    if (!mado.advanced) return;
    (mado.advanced.remove || '').split('/').map(selector => {
      const target = this.context.document.querySelector(selector.trim());
      if (target && typeof target.remove == 'function') target.remove();
    });
  }
}
