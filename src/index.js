import './styles.css';

function start(params) {
    const {el, config, options} = params;
    const {resolveTranslation, resolveImageUrl, renderInlineVideoPlayer} = options;

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-class';

    const title = document.createElement('h1');
    /*
        resolveTranslation takes one or two arguments.
        1. A translation label, e.g. 'global.default_title'
        2. (optional) The fallback text to use, if no translation is available for the given label
     */
    title.innerText = resolveTranslation(config.caption, 'BC One winners');
    wrapper.appendChild(title);

    function createNode(element) {
      return document.createElement(element);
    }
    
    function append(parent, el) {
      return parent.appendChild(el);
    }

    function displayData(data) {
      const result = data;
      result.map(item => {
        const element = createNode('div');
        const title = createNode('h2');
        const image = createNode('img');
        title.innerHTML = `${item.name}`;
        image.src = item.imageUrl;
        append(element, title);
        append(element, image);
        append(wrapper, element);
      });
    }
    const getData = () => { 
      return fetch('https://stage-web03019.microsites03.redbull.com/test/php/winners.php?f=winners')
      .then(response => response.json())
      .then(data => data)
      .catch(error => error);
    };

    return Promise.all([
      getData(),
    ]).then((getData) => {
      const data = getData;
      console.log(data);
      
      displayData(data[0].data)
      el.appendChild(wrapper);

      return {
        stop: () => {
          console.log('stopped');
        }
      };
    });
}

export {start};
