(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",u="quarter",c="year",d="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},v=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:v,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,a=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:c,w:o,d:a,D:d,h:r,m:s,s:i,ms:n,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},g="en",y={};y[g]=m;var $="$isDayjsObject",b=function(e){return e instanceof D||!(!e||!e[$])},M=function e(t,n,i){var s;if(!t)return g;if("string"==typeof t){var r=t.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;y[o]=t,s=o}return!i&&s&&(g=s),s||!i&&g},C=function(e,t){if(b(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new D(n)},w=_;w.l=M,w.i=b,w.w=function(e,t){return C(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var D=function(){function m(e){this.$L=M(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[$]=!0}var v=m.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(w.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return w},v.isValid=function(){return!(this.$d.toString()===p)},v.isSame=function(e,t){var n=C(e);return this.startOf(t)<=n&&n<=this.endOf(t)},v.isAfter=function(e,t){return C(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<C(e)},v.$g=function(e,t,n){return w.u(e)?this[t]:this.set(n,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var n=this,u=!!w.u(t)||t,p=w.p(e),f=function(e,t){var i=w.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return u?i:i.endOf(a)},h=function(e,t){return w.w(n.toDate()[e].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},m=this.$W,v=this.$M,_=this.$D,g="set"+(this.$u?"UTC":"");switch(p){case c:return u?f(1,0):f(31,11);case l:return u?f(1,v):f(0,v+1);case o:var y=this.$locale().weekStart||0,$=(m<y?m+7:m)-y;return f(u?_-$:_+(6-$),v);case a:case d:return h(g+"Hours",0);case r:return h(g+"Minutes",1);case s:return h(g+"Seconds",2);case i:return h(g+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var o,u=w.p(e),p="set"+(this.$u?"UTC":""),f=(o={},o[a]=p+"Date",o[d]=p+"Date",o[l]=p+"Month",o[c]=p+"FullYear",o[r]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[u],h=u===a?this.$D+(t-this.$W):t;if(u===l||u===c){var m=this.clone().set(d,1);m.$d[f](h),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[w.p(e)]()},v.add=function(n,u){var d,p=this;n=Number(n);var f=w.p(u),h=function(e){var t=C(p);return w.w(t.date(t.date()+Math.round(e*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===c)return this.set(c,this.$y+n);if(f===a)return h(1);if(f===o)return h(7);var m=(d={},d[s]=e,d[r]=t,d[i]=1e3,d)[f]||1,v=this.$d.getTime()+n*m;return w.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,c=n.meridiem,d=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},f=function(e){return w.s(r%12||12,e,"0")},m=c||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(h,(function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return w.s(t.$y,4,"0");case"M":return o+1;case"MM":return w.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,u,3);case"MMMM":return d(u,o);case"D":return t.$D;case"DD":return w.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(n.weekdaysMin,t.$W,l,2);case"ddd":return d(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(r);case"HH":return w.s(r,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return m(r,a,!0);case"A":return m(r,a,!1);case"m":return String(a);case"mm":return w.s(a,2,"0");case"s":return String(t.$s);case"ss":return w.s(t.$s,2,"0");case"SSS":return w.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,d,p){var f,h=this,m=w.p(d),v=C(n),_=(v.utcOffset()-this.utcOffset())*e,g=this-v,y=function(){return w.m(h,v)};switch(m){case c:f=y()/12;break;case l:f=y();break;case u:f=y()/3;break;case o:f=(g-_)/6048e5;break;case a:f=(g-_)/864e5;break;case r:f=g/t;break;case s:f=g/e;break;case i:f=g/1e3;break;default:f=g}return p?f:w.a(f)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return y[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=M(e,t,!0);return i&&(n.$L=i),n},v.clone=function(){return w.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),T=D.prototype;return C.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",c],["$D",d]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),C.extend=function(e,t){return e.$i||(e(t,D,C),e.$i=!0),C},C.locale=M,C.isDayjs=b,C.unix=function(e){return C(1e3*e)},C.en=y[g],C.Ls=y,C.p={},C}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class i{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n            <div class="trip-filters__filter">\n              <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n              <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n              <label class="trip-filters__filter-label" for="filter-future">Future</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n              <label class="trip-filters__filter-label" for="filter-present">Present</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n              <label class="trip-filters__filter-label" for="filter-past">Past</label>\n            </div>\n\n            <button class="visually-hidden" type="submit">Accept filter</button>\n          </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<section class="trip-main__trip-info  trip-info"></section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<div class="trip-info__main">\n            <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>\n            <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>\n          </div>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class a{getTemplate(){return'<p class="trip-info__cost">\n            Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n          </p>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class o{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class l{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class u{getTemplate(){return'<li class="trip-events__item"></li>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var c=n(484),d=n.n(c);const p="D/MM/YY H:mm",f="HH:mm";function h(e){return e[Math.floor(Math.random()*e.length)]}const m=()=>{let e=0;return()=>(e+=1,e)};function v(e,t){const n=Math.ceil(Math.min(Math.abs(e),Math.abs(t))),i=Math.floor(Math.max(Math.abs(e),Math.abs(t))),s=Math.random()*(i-n+1)+n;return Math.floor(s)}function _(e,t){return e?d()(e).format(t):""}function g(e){return e?e[0].toUpperCase()+e.slice(1):e}class y{constructor({point:e,offers:t,destination:n}){this.point=e,this.offers=t,this.destination=n}getTemplate(){return function(e,t,n){const{type:i,dateFrom:s,dateTo:r,price:a,isFavorite:o}=e,{name:l}=n,u=_(s,"MMM D"),c=_(s,"YYYY-MM-DD"),d=_(s,f),p=_(r,f),h=o?" event__favorite-btn--active":"",m=function(e){return e.length>0?`<h4 class="visually-hidden">Offers:</h4>\n    <ul class="event__selected-offers">\n    ${e.map((e=>`<li class="event__offer">\n      <span class="event__offer-title">${e.title}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${e.price}</span>\n    </li>`)).join("")}\n    </ul>`:""}(t.filter((t=>e.offers.includes(t.id))));return`<div class="event">\n            <time class="event__date" datetime="${c}">${u}</time>\n            <div class="event__type">\n              <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="${i}">\n            </div>\n            <h3 class="event__title">${g(i)} ${l}</h3>\n            <div class="event__schedule">\n              <p class="event__time">\n                <time class="event__start-time" datetime="2019-03-18T10:30">${d}</time>\n                &mdash;\n                <time class="event__end-time" datetime="2019-03-18T11:00">${p}</time>\n              </p>\n              <p class="event__duration">30M</p>\n            </div>\n            <p class="event__price">\n              &euro;&nbsp;<span class="event__price-value">${a}</span>\n            </p>\n            ${m}\n            <button class="event__favorite-btn${h}" type="button">\n              <span class="visually-hidden">Add to favorite</span>\n              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n              </svg>\n            </button>\n            <button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>\n          </div>`}(this.point,this.offers,this.destination)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const $=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],b=["Upgrade to a business class","Choose the radio station","Choose temperature","Infotainment system","Order meal","Choose seats","Book a taxi at the arrival point","Order a breakfast","Wake up at a certain time","Choose meal","Choose seats","Upgrade to comfort class","Choose the time of check-in","Choose the time of check-out","Add breakfast","Add luggage","Business lounge","With automatic transmission","With air conditioning","Choose live music","Choose VIP area"],M=["Moscow","Novosibirsk","Yekaterinburg","Kazan","Athens","Ozark"],C=["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus.","In rutrum ac purus sit amet tempus."],w={id:1,type:"Flight",offers:[],destination:"",dateFrom:"",dateTo:"",price:0};class D{constructor({point:e=w,offers:t,destination:n}){this.point=e,this.offers=t,this.destination=n}getTemplate(){return function(e,t,n){const{type:i,dateFrom:s,dateTo:r,price:a}=e,{name:o,description:l,photos:u}=void 0!==n?n:"",c=void 0!==o?o:"",d=_(s,p),f=_(r,p),h=function(e,t){return e.map((e=>`\n          <div class="event__type-item">\n            <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}"${e===t?" checked":""}>\n            <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${g(e)}</label>\n          </div>`)).join("")}($,i),m=function(e){return e.length>0?`<section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n        <div class="event__available-offers">\n        ${e.map((e=>`<div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e.id}-1" type="checkbox" name="event-offer-${e.id}">\n      <label class="event__offer-label" for="event-offer-${e.id}-1">\n        <span class="event__offer-title">${e.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e.price}</span>\n      </label>\n    </div>`)).join("")}\n      </div>\n    </section>`:""}(t),v=void 0!==n?function({name:e,description:t,photos:n}){const i=function(e){return e.length>0?`<div class="event__photos-container">\n      <div class="event__photos-tape">\n        ${e.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`)).join("")}\n      </div>\n    </div>`:""}(n);return`<section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">${e}. ${t}</p>\n    ${i}\n  </section>`}({name:o,description:l,photos:u}):"";return`<form class="event event--edit" action="#" method="post">\n            <header class="event__header">\n              <div class="event__type-wrapper">\n                <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                  <span class="visually-hidden">Choose event type</span>\n                  <img class="event__type-icon" width="17" height="17" src="img/icons/${i}.png" alt="${i}">\n                </label>\n                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                <div class="event__type-list">\n                  <fieldset class="event__type-group">\n                    <legend class="visually-hidden">Event type</legend>\n                    ${h}\n                  </fieldset>\n                </div>\n              </div>\n\n              <div class="event__field-group  event__field-group--destination">\n                <label class="event__label  event__type-output" for="event-destination-1">\n                  ${i}\n                </label>\n                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${c}" list="destination-list-1">\n                <datalist id="destination-list-1">\n                  <option value="${c}"></option>\n                </datalist>\n              </div>\n\n              <div class="event__field-group  event__field-group--time">\n                <label class="visually-hidden" for="event-start-time-1">From</label>\n                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${d}">\n                &mdash;\n                <label class="visually-hidden" for="event-end-time-1">To</label>\n                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${f}">\n              </div>\n\n              <div class="event__field-group  event__field-group--price">\n                <label class="event__label" for="event-price-1">\n                  <span class="visually-hidden">Price</span>\n                  &euro; ${a}\n                </label>\n                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n              </div>\n\n              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n              <button class="event__reset-btn" type="reset">Cancel</button>\n            </header>\n            <section class="event__details">\n              ${m}\n              ${v}\n            </section>\n          </form>`}(this.point,this.offers,this.destination)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const T=m(),S=m(),O=m(),E=v(1,M.length),k=new class{destinations=[];offers=[];points=[];constructor(){this.destinations=this.generateDestinations(),this.offers=this.generateOffers(),this.points=this.generatePoints()}getDestinations(){return this.destinations}getOffers(){return this.offers}getPoints(){return this.points}generateDestinations(){return Array.from({length:E},(()=>function(){const e=Array.from({length:v(1,C.length)},(()=>h(C))).join(" ");return{id:T(),name:h(M),description:e,photos:Array.from({length:v(0,5)},(function(){return{description:e,src:`https://loremflickr.com/248/152?random=${Math.random()}`}}))}}()))}generateOffers(){return $.map((e=>({type:e,offers:Array.from({length:v(1,v(0,5))},(()=>({id:S(),title:h(b),price:v(20,100)})))})))}generatePoints(){return Array.from({length:10},(()=>{const e=h($),t=h(this.destinations),n=v(0,1),i=this.offers.find((t=>t.type===e)),s=n?i.offers.slice(0,v(0,5)).map((e=>e.id)):[];return((e,t,n)=>({id:O(),type:e,offers:t,destination:n,dateFrom:new Date("2023-12-25, 16:00"),dateTo:new Date("2023-12-27, 16:00"),isFavorite:v(0,1),price:v(20,100)}))(e,s,t.id)}))}},x=new class{constructor(e){this.service=e,this.destinations=this.service.getDestinations()}get(){return this.destinations}getById(e){return this.destinations.find((t=>t.id===e))}}(k),I=new class{constructor(e){this.service=e,this.offers=this.service.getOffers()}get(){return this.offers}getByType(e){return this.offers.find((t=>t.type===e)).offers}}(k),A=new class{constructor(e){this.service=e,this.points=this.service.getPoints()}get(){return this.points}}(k),L=document.querySelector("header"),Y=document.querySelector(".trip-events"),F=new class{filtersComponent=new i;tripInfoComponent=new s;tripInfoMainComponent=new r;tripInfoCostComponent=new a;constructor({presenterContainer:e}){this.presenterContainer=e}siteFiltersContainer=document.querySelector(".trip-controls__filters");siteTripMainContainer=document.querySelector(".trip-main");init(){t(this.tripInfoComponent,this.siteTripMainContainer,"afterbegin"),t(this.tripInfoMainComponent,this.tripInfoComponent.getElement()),t(this.tripInfoCostComponent,this.tripInfoComponent.getElement()),t(this.filtersComponent,this.siteFiltersContainer)}}({presenterContainer:L}),H=new class{constructor({presenterContainer:e,destinationModel:t,offersModel:n,pointsModel:i}){this.presenterContainer=e,this.destinationModel=t,this.offersModel=n,this.pointsModel=i}init(){this.destination=[...this.destinationModel.get()],this.offers=[...this.offersModel.get()],this.points=[...this.pointsModel.get()],this.sortingComponent=new o,this.eventsListComponent=new l,this.eventListItemComponent=new u;let e=this.points[0].destination,n=this.points[0].type,i=this.destinationModel.getById(e),s=this.offersModel.getByType(n);this.formComponent=new D({point:this.points[0],offers:s,destination:i}),t(this.sortingComponent,this.presenterContainer),t(this.eventsListComponent,this.presenterContainer),t(this.eventListItemComponent,this.eventsListComponent.getElement()),t(this.formComponent,this.eventListItemComponent.getElement());for(let r=1;r<this.points.length;r++)e=this.points[r].destination,i=this.destinationModel.getById(e),n=this.points[r].type,s=this.offersModel.getByType(n),t(new u,this.eventsListComponent.getElement()),t(new y({point:this.points[r],offers:s,destination:i}),this.eventsListComponent.getElement().lastElementChild)}}({presenterContainer:Y,destinationModel:x,offersModel:I,pointsModel:A});F.init(),H.init()})()})();
//# sourceMappingURL=bundle.0ce630e80b806c795bf2.js.map