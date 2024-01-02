(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",u="quarter",c="year",d="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},h=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:h,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+h(i,2,"0")+":"+h(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,a=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:c,w:o,d:a,D:d,h:r,m:s,s:i,ms:n,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},$="en",y={};y[$]=m;var g="$isDayjsObject",b=function(e){return e instanceof T||!(!e||!e[g])},M=function e(t,n,i){var s;if(!t)return $;if("string"==typeof t){var r=t.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;y[o]=t,s=o}return!i&&s&&($=s),s||!i&&$},D=function(e,t){if(b(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new T(n)},S=_;S.l=M,S.i=b,S.w=function(e,t){return D(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var T=function(){function m(e){this.$L=M(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var h=m.prototype;return h.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(S.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.init()},h.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},h.$utils=function(){return S},h.isValid=function(){return!(this.$d.toString()===p)},h.isSame=function(e,t){var n=D(e);return this.startOf(t)<=n&&n<=this.endOf(t)},h.isAfter=function(e,t){return D(e)<this.startOf(t)},h.isBefore=function(e,t){return this.endOf(t)<D(e)},h.$g=function(e,t,n){return S.u(e)?this[t]:this.set(n,e)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(e,t){var n=this,u=!!S.u(t)||t,p=S.p(e),f=function(e,t){var i=S.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return u?i:i.endOf(a)},v=function(e,t){return S.w(n.toDate()[e].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},m=this.$W,h=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(p){case c:return u?f(1,0):f(31,11);case l:return u?f(1,h):f(0,h+1);case o:var y=this.$locale().weekStart||0,g=(m<y?m+7:m)-y;return f(u?_-g:_+(6-g),h);case a:case d:return v($+"Hours",0);case r:return v($+"Minutes",1);case s:return v($+"Seconds",2);case i:return v($+"Milliseconds",3);default:return this.clone()}},h.endOf=function(e){return this.startOf(e,!1)},h.$set=function(e,t){var o,u=S.p(e),p="set"+(this.$u?"UTC":""),f=(o={},o[a]=p+"Date",o[d]=p+"Date",o[l]=p+"Month",o[c]=p+"FullYear",o[r]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[u],v=u===a?this.$D+(t-this.$W):t;if(u===l||u===c){var m=this.clone().set(d,1);m.$d[f](v),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},h.set=function(e,t){return this.clone().$set(e,t)},h.get=function(e){return this[S.p(e)]()},h.add=function(n,u){var d,p=this;n=Number(n);var f=S.p(u),v=function(e){var t=D(p);return S.w(t.date(t.date()+Math.round(e*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===c)return this.set(c,this.$y+n);if(f===a)return v(1);if(f===o)return v(7);var m=(d={},d[s]=e,d[r]=t,d[i]=1e3,d)[f]||1,h=this.$d.getTime()+n*m;return S.w(h,this)},h.subtract=function(e,t){return this.add(-1*e,t)},h.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=S.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,c=n.meridiem,d=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},f=function(e){return S.s(r%12||12,e,"0")},m=c||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(v,(function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return S.s(t.$y,4,"0");case"M":return o+1;case"MM":return S.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,u,3);case"MMMM":return d(u,o);case"D":return t.$D;case"DD":return S.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(n.weekdaysMin,t.$W,l,2);case"ddd":return d(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(r);case"HH":return S.s(r,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return m(r,a,!0);case"A":return m(r,a,!1);case"m":return String(a);case"mm":return S.s(a,2,"0");case"s":return String(t.$s);case"ss":return S.s(t.$s,2,"0");case"SSS":return S.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(n,d,p){var f,v=this,m=S.p(d),h=D(n),_=(h.utcOffset()-this.utcOffset())*e,$=this-h,y=function(){return S.m(v,h)};switch(m){case c:f=y()/12;break;case l:f=y();break;case u:f=y()/3;break;case o:f=($-_)/6048e5;break;case a:f=($-_)/864e5;break;case r:f=$/t;break;case s:f=$/e;break;case i:f=$/1e3;break;default:f=$}return p?f:S.a(f)},h.daysInMonth=function(){return this.endOf(l).$D},h.$locale=function(){return y[this.$L]},h.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=M(e,t,!0);return i&&(n.$L=i),n},h.clone=function(){return S.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},m}(),w=T.prototype;return D.prototype=w,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",c],["$D",d]].forEach((function(e){w[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),D.extend=function(e,t){return e.$i||(e(t,T,D),e.$i=!0),D},D.locale=M,D.isDayjs=b,D.unix=function(e){return D(1e3*e)},D.en=y[$],D.Ls=y,D.p={},D}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],t=60,i=1440,s={FULL_DATE:"DD/MM/YY HH:mm",DATE:"MMM D",TIME:"HH:mm",DURATION_MINUTES:"mm[M]",DURATION_HOURS_MINUTES:"HH[H] mm[M]",DURATION_DAYS_HOURS_MINUTES:"DD[D] HH[H] mm[M]"};var r=n(484),a=n.n(r);const o=e=>{const t=Math.random()*e;return Math.floor(t)};function l(e){return e[Math.floor(Math.random()*e.length)]}function u(e){return e?a()(e).format(s.FULL_DATE):""}function c(e){return e?a()(e).format(s.TIME):""}const d=[{id:"1",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.",name:"Chamonix",pictures:[{src:`https://loremflickr.com/248/152?random=${o(100)}`,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra."}]},{id:"2",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",name:"Amsterdam",pictures:[{src:`https://loremflickr.com/248/152?random=${o(100)}`,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}]},{id:"3",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.",name:"Oslo",pictures:[{src:`https://loremflickr.com/248/152?random=${o(100)}`,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus."}]},{id:"4",description:"",name:"Helsinki",pictures:[{src:`https://loremflickr.com/248/152?random=${o(100)}`,description:""}]}],p=[{type:"taxi",offers:[{id:"1",title:"Upgrade to a business class",price:120},{id:"2",title:"Order Uber",price:40},{id:"3",title:"Switch radio",price:50}]},{type:"bus",offers:[{id:"4",title:"Choose seats",price:5}]},{type:"train",offers:[{id:"5",title:"Add meal",price:15}]},{type:"ship",offers:[{id:"6",title:"Switch to comfort",price:80}]},{type:"drive",offers:[]},{type:"flight",offers:[{id:"7",title:"Add luggage",price:50},{id:"8",title:"Switch to business",price:100}]},{type:"check-in",offers:[{id:"9",title:"Online registration",price:15}]},{type:"sightseeing",offers:[{id:"10",title:"Book tickets",price:40},{id:"",title:"Lunch in city",price:30}]},{type:"restaurant",offers:[{id:"11",title:"Reserve a table",price:10}]}],f=[{id:"1",basePrice:o(1e4),dateFrom:"2019-07-10T12:55:56.845Z",dateTo:"2019-07-11T13:22:13.375Z",destination:"1",isFavorite:!1,offers:["1","2","8","11"],type:l(e)},{id:"2",basePrice:1200,dateFrom:"2019-07-15T06:48:56.845Z",dateTo:"2019-07-15T11:48:56.845Z",destination:"2",isFavorite:!1,offers:["2","4","5"],type:l(e)},{id:"3",basePrice:1500,dateFrom:"2019-08-20T08:35:56.845Z",dateTo:"2019-08-20T08:55:13.375Z",destination:"3",isFavorite:!1,offers:[],type:l(e)},{id:"4",basePrice:700,dateFrom:"2019-03-20T12:10:56.845Z",dateTo:"2019-03-20T13:22:13.375Z",destination:"4",isFavorite:!0,offers:["3"],type:l(e)}];function v(){return l(f)}function m(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function h(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class _{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=m(this.getTemplate())),this.element}removeElement(){this.element=null}}class ${constructor({point:e,destinations:t,offers:n}){this.point=e,this.destinations=t,this.offers=n}getTemplate(){return function(e,n,r){const{dateFrom:o,dateTo:l,type:u,basePrice:d,isFavorite:p}=e,f=r.find((t=>t.type===e.type)).offers.filter((t=>e.offers.includes(t.id))),v=n.find((t=>t.id===e.destination)),m=(h=o)?a()(h).format(s.DATE):"";var h;const _=c(o),$=c(l),y=function(e,n){const s=a()(n).diff(e,"minute");let r,o,l;function u(){return o&&o<10||0===o?`0${o}`:o}function c(){return l&&l<10||0===l?`0${l}`:l}return s>i?(r=Math.floor(s/i),o=Math.floor(s%i/t),l=s%i%t,`${r&&r<10?`0${r}`:r}D ${u()}H ${c()}M`):s>t?(o=Math.floor(s/t),l=s%t,`${u()}H ${c()}M`):s<t?(l=s,`${c()}M`):void 0}(o,l),g=p?"event__favorite-btn--active":"";return`\n  (<li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="${o}">${m}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${u} ${v.name}</h3>\n        <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${o}">${_}</time>\n          &mdash;\n          <time class="event__end-time" datetime="${l}">${$}</time>\n        </p>\n        <p class="event__duration">${y}</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${d}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${f.map((e=>function({title:e,price:t}){return`<li class="event__offer">\n    <span class="event__offer-title">${e}</span>\n    &plus;&euro;&nbsp;\n    <span class="event__offer-price">${t}</span>\n  </li>`}(e))).join("")}\n\n      </ul>\n      <button class="event__favorite-btn ${g}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div >\n  </li >) `}(this.point,this.destinations,this.offers)}getElement(){return this.element||(this.element=m(this.getTemplate())),this.element}removeElement(){this.element=null}}const y=e=>e.split(" ").join("_");class g{constructor({point:e,destinations:t,offers:n}){this.point=e,this.destinations=t,this.offers=n}getTemplate(){return function(t,n,i){const s=n.find((e=>e.id===t.destination)),r=i.find((e=>e.type===t.type)).offers,a=r.filter((e=>t.offers.includes(e.id))),{dateFrom:o,dateTo:l,basePrice:c,type:d}=t,{name:p,description:f,pictures:v}=s||{},m=t.id||0,h=u(o),_=u(l);return`\n      <li class="trip-events__item">\n        <form class="event event--edit" action="#" method="post">\n          <header class="event__header">\n            <div class="event__type-wrapper">\n              <label class="event__type  event__type-btn" for="event-type-toggle-${m}">\n                <span class="visually-hidden">Choose event type</span>\n                  <img class="event__type-icon" width="17" height="17" src="img/icons/${d}.png" alt="Event type icon">\n              </label>\n              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${m}" type="checkbox">\n              <div class="event__type-list">\n                <fieldset class="event__type-group">\n                  <legend class="visually-hidden">Event type</legend>\n                  ${e.map((e=>{return`<div class="event__type-item">\n                    <input id="event-type-${e}-${m}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${e===d?"checked":""}>\n                    <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-${m}">${t=e,`${t[0].toUpperCase()}${t.slice(1)}`}</label>\n                  </div>`;var t})).join("")}\n                </fieldset>\n              </div>\n            </div>\n\n            <div class="event__field-group  event__field-group--destination">\n              <label class="event__label  event__type-output" for="event-destination-${m}">\n                ${d}\n              </label>\n              <input class="event__input  event__input--destination" id="event-destination-${m}" type="text" name="event-destination" value="${p||""}" list="destination-list-${m}">\n              <datalist id="destination-list-${m}">\n                ${n.map((e=>`<option value="${e.name}"></option>`)).join("")}\n              </datalist>\n            </div>\n\n            <div class="event__field-group  event__field-group--time">\n              <label class="visually-hidden" for="event-start-time-${m}">From</label>\n              <input class="event__input  event__input--time" id="event-start-time-${m}" type="text" name="event-start-time" value="${h}">\n              &mdash;\n              <label class="visually-hidden" for="event-end-time-${m}">To</label>\n              <input class="event__input  event__input--time" id="event-end-time-${m}" type="text" name="event-end-time" value="${_}">\n            </div>\n\n            <div class="event__field-group  event__field-group--price">\n              <label class="event__label" for="event-price-${m}">\n                <span class="visually-hidden">Price</span>\n                &euro;\n              </label>\n              <input class="event__input  event__input--price" id="event-price-${m}" type="text" name="event-price" value="${c}">\n            </div>\n\n            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n            <button class="event__reset-btn" type="reset">${t.id?"Delete":"Cancel"}</button>\n            ${t.id?'<button class="event__rollup-btn" type="button">\n                <span class="visually-hidden">Open event</span>\n              </button>':""}\n\n          </header>\n          <section class="event__details">\n  ${r.length?`<section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n        <div class="event__available-offers">\n        ${r.map((e=>`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${y(e.title)}-${m}" type="checkbox" name="event-offer-${y(e.title)}" ${a.map((e=>e.id)).includes(e.id)?"checked":""}>\n        <label class="event__offer-label" for="event-offer-${e.title}-${m}">\n          <span class="event__offer-title">${e.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${e.price}</span>\n        </label>\n      </div>`)).join("")}\n    </div>\n  </section>`:""}\n\n      ${s?`<section class="event__section  event__section--destination">\n  <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n  <p class="event__destination-description">${f}</p>\n  ${v.length?`<div class="event__photos-container">\n  <div class="event__photos-tape">\n  ${v.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`))}\n  </div>\n              </div>`:""}\n  </section>`:""}\n\n          </section>\n        </form>\n      </li>`}(this.point,this.destinations,this.offers)}getElement(){return this.element||(this.element=m(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{getTemplate(){return'\n  (<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  <div class="trip-sort__item  trip-sort__item--day">\n    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n    <label class="trip-sort__btn" for="sort-day">Day</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--event">\n    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n    <label class="trip-sort__btn" for="sort-event">Event</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--time">\n    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n    <label class="trip-sort__btn" for="sort-time">Time</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--price">\n    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n    <label class="trip-sort__btn" for="sort-price">Price</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--offer">\n    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n    <label class="trip-sort__btn" for="sort-offer">Offers</label>\n  </div>\n</form>) '}getElement(){return this.element||(this.element=m(this.getTemplate())),this.element}removeElement(){this.element=null}}const M=document.querySelector(".page-header").querySelector(".trip-controls__filters"),D=document.querySelector(".page-main").querySelector(".trip-events"),S=new class{points=Array.from({length:4},v);offers=p;destinations=d;getPoints(){return this.points}getDestinations(){return this.destinations}getOffers(){return this.offers}},T=new class{pointListComponent=new _;constructor({boardContainer:e,pointsModel:t}){this.boardContainer=e,this.pointsModel=t}init(){this.boardPoints=[...this.pointsModel.getPoints()];const t=this.pointsModel.getDestinations(),n=this.pointsModel.getOffers();h(new b,this.boardContainer),h(this.pointListComponent,this.boardContainer),h(new g({point:{basePrice:0,dateFrom:(new Date).toISOString(),dateTo:(new Date).toISOString(),destination:0,isFavorite:!1,offers:[],type:e[0]},destinations:t,offers:n}),this.pointListComponent.getElement()),h(new g({point:this.boardPoints[0],destinations:t,offers:n}),this.pointListComponent.getElement());for(let e=1;e<this.boardPoints.length;e++)h(new $({point:this.boardPoints[e],destinations:t,offers:n}),this.pointListComponent.getElement())}}({boardContainer:D,pointsModel:S});h(new class{getTemplate(){return'\n  (<form class="trip-filters" action="#" method="get">\n  <div class="trip-filters__filter">\n    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n    <label class="trip-filters__filter-label" for="filter-future">Future</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n    <label class="trip-filters__filter-label" for="filter-present">Present</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n    <label class="trip-filters__filter-label" for="filter-past">Past</label>\n  </div>\n\n  <button class="visually-hidden" type="submit">Accept filter</button>\n</form> '}getElement(){return this.element||(this.element=m(this.getTemplate())),this.element}removeElement(){this.element=null}},M),T.init()})()})();
//# sourceMappingURL=bundle.611b4773a5fa7161f223.js.map