// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

import { addResizeListener, removeResizeListener } from './resize-event';
import scrollbarWidth from './scrollbar-width';
import { toObject, styleToObject } from './util';
import Bar from './bar';

/* istanbul ignore next */
export default {
  name: 'v-element-scrollbar',

  components: { Bar },

  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    direction:{
      type:String,
      default: 'vertical'
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };
  },

  computed: {
    wrap() {
      return this.$refs.wrap;
    }
  },

  render(h) {
    let gutter = scrollbarWidth();
    let style = this.wrapStyle;

    if (gutter) {
      const gutterWith = `-${gutter}px`;
      const gutterStyle = this.getDirectionStyle(gutterWith);  // 获得margin-left和overflow-y:scroll

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle);
        gutterStyleObj = styleToObject(gutterStyle);
        style = {...style, ...gutterStyleObj};
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
    }
    
    const view = h(this.tag, {
      class: ['el-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default);
    const wrap = (
      <div
        ref="wrap"
        style={ style }
        onScroll={ this.handleScroll }
        class={ [this.wrapClass, 'el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default'] }>
        { [view] }
      </div>
    );

    const verticalBar = (
      <Bar
        vertical
        move={ this.moveY }
        size={ this.sizeHeight }></Bar>
    );
    const horizontalBar = (
      <Bar
        move={ this.moveX }
        size={ this.sizeWidth }></Bar>
    )

    const bars = this.getDirectionBars(verticalBar,horizontalBar)

    let nodes;
    if (!this.native) {
      nodes = ([
        wrap,
        ...bars
      ]);
    } else {
      nodes = ([
        <div
          ref="wrap"
          class={ [this.wrapClass, 'el-scrollbar__wrap'] }>
          { [view] }
        </div>
      ]);
    }
    return h('div', { class: 'el-scrollbar' }, nodes);
  },

  methods: {
    handleScroll() {
      const wrap = this.wrap;

      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
    },

    update() {
      let heightPercentage, widthPercentage;
      const wrap = this.wrap;
      if (!wrap) return;

      heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight); //fan scrollHeight为scroll子元素内容的高度
      widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
    },

    getDirectionStyle(gutterWidth){
      const marginStyle = (bottom,right) => `margin-bottom: ${bottom};margin-right: ${right};`;
      const marginData = {
        vertical: marginStyle(0,gutterWidth),
        horizontal: marginStyle(gutterWidth,0),
        both: marginStyle(gutterWidth,gutterWidth)
      }

      const overflowData = {
        vertical: 'overflow-y: scroll',
        horizontal: 'overflow-x: scroll',
        both: 'overflow: scroll'
      }
      
      return `${marginData[this.direction]}${overflowData[this.direction]}`;
    },

    getDirectionBars(verticalBar,horizontalBar){
     
      const barData = {
        vertical: [verticalBar],
        horizontal: [horizontalBar],
        both: [verticalBar,horizontalBar]
      }

      return barData[this.direction]
    }
  },

  mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },

  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  }
};
