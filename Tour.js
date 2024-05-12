AFRAME.registerComponent("tour", {
    schema: {
      state:{type:"string",default:"places-list"},
      selectedCard: {type:"string",default:"#card1"},
    },  
    init: function () {
      this.placesContainer = this.el;
      this.createCards();
    },
  
    createCards: function () {
      const thumbNailsRef = [
        {
          id: "spider-man",
          title: "Spider Man",
          url: "Thumbnails/Spider Man.jpeg",
        },
        {
          id: "batman",
          title: "Batman",
          url: "Thumbnails/Batman.jpeg",
        },
  
        {
          id: "iron-man",
          title: "Iron Man",
          url: "Thumbnails/Iron man.jpeg",
        },
        {
          id: "superman",
          title: "Superman",
          url: "Thumbnails/Superman.jpeg",
        },
      ];
      let prevoiusXPosition = -60;
  
      for (var item of thumbNailsRef) {
        const posX = prevoiusXPosition + 25;
        const posY = 10;
        const posZ = -40;
        const position = { x: posX, y: posY, z: posZ };
        prevoiusXPosition = posX;
  
        // Border Element
        const borderEl = this.createBorder(position, item.id);
  
        // Thumbnail Element
        const thumbNail = this.createThumbNail(item);
        borderEl.appendChild(thumbNail);
  
        // Title Text Element
        const titleEl = this.createTitleEl(position, item);
        borderEl.appendChild(titleEl);
  
        this.placesContainer.appendChild(borderEl);
      }
    },
    createBorder: function (position, id) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("id", id);
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "plane",
        width: 20,
        height: 28,
      });
      entityEl.setAttribute("position", position);
      entityEl.setAttribute("material", {
        color: "#0077CC",
        opacity: 1,
      });
  
      //Add cursor-listener component to the ring border entity to change it's color 
      //On Cursor 'mouseenter' and 'mouseleave' entity
      entityEl.setAttribute("cursor-listener", {});
  
      return entityEl;
    },
    createThumbNail: function (item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "plane",
        width:19,
        height:27,
      });
      entityEl.setAttribute("material", { src: item.url });
  
      return entityEl;
    },
    createTitleEl: function (position, item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 70,
        color: "#e65100",
        value: item.title,
      });
      const elPosition = position;
      elPosition.y = -30;
      entityEl.setAttribute("position", elPosition);
      entityEl.setAttribute("visible", true);
      
      return entityEl;
    },
    hideEl: function(elList){
      elList.map((el)=>{
        el.setAttribute("visible",false)
      })
    },
    showView: function(){
      const {selectedCard} = this.data
      const skyEl = document.querySelector("#main-container")
      skyEl.setAttribute("material",{src:`assets/360_images/${selectedCard}/place-0.jpg`,
    color:"white"})
    },
    tick: function(){
      const {state} = this.el.getAttribute("tour")
      if (state == "view"){
        this.hideEl([
          this.placesContainer
        ])
        this.showView()
      }
    },
  });