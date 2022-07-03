<template>
  <div>
    <h1 class="t-center">LocoMovie</h1>
    <br />
    <div id="searchBox" class="center">
      <span class="p-input-icon-left" id="searchBar">
        <i class="pi pi-search" />
        <InputText
          type="text"
          :disabled="search.loading"
          v-model="search.query"
          placeholder="Movie Name"
        />
      </span>
      <Button
        label="Search"
        @click="searchMovies()"
        :loading="search.loading"
      />
    </div>
    <br /><br /><br />
    <div class="center" v-if="movies.length == 0">
      <Timeline :value="steps" align="left" style="padding-right: 20%">
        <template #content="slotProps">
          {{ slotProps.item.status }}
        </template>
      </Timeline>
    </div>
    <div class="card" v-else>
      <DataView :value="movies" :layout="layout" :paginator="true" :rows="9">
        <template #list="slotProps">
          <div class="col-12">
            <div class="product-list-item p-ripple" v-ripple>
              <img
                :src="
                  slotProps.data.poster_path
                    ? 'https://image.tmdb.org/t/p/original/' +
                      slotProps.data.poster_path
                    : './img/product-placeholder.webp'
                "
                :alt="slotProps.data.title"
              />
              <div class="product-list-detail">
                <h3 class="product-name">{{ slotProps.data.title }}</h3>
                <small>{{ slotProps.data.release_date }}</small>
                <div class="product-description">
                  {{ slotProps.data.overview }}
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #grid="slotProps">
          <div class="col-12 md:col-4">
            <div class="product-grid-item card">
              <div class="product-grid-item-top"></div>
              <div class="product-grid-item-content">
                <img
                  :src="'demo/images/product/' + slotProps.data.image"
                  :alt="slotProps.data.name"
                />
                <div class="product-name">{{ slotProps.data.name }}</div>
                <div class="product-description">
                  {{ slotProps.data.description }}
                </div>
              </div>
              <!-- <div class="product-grid-item-bottom">
                <span class="product-price">${{ slotProps.data.price }}</span>
                <Button
                  icon="pi pi-shopping-cart"
                  :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
                ></Button>
              </div> -->
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      search: {
        loading: false,
        query: "",
      },
      layout: "list",
      steps: [
        {
          status: "Find a movie",
        },
        {
          status: "Check available regions",
        },
      ],
      movies: [],
    };
  },
  methods: {
    async searchMovies() {
      this.search.loading = true;
      let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6d6e2596be62c95d61bc5343009fd0e4&language=en-US&query=${this.search.query}&page=1&include_adult=true`
      );

      if (response.ok) {
        let json = await response.json();
        console.log(json);
        this.movies = json.results;
        this.search.loading = false;
      } else {
        alert("HTTP-Error: " + response.status);
        this.search.loading = false;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
#searchBar {
  flex-grow: 1;
}
#searchBox {
  display: flex;
  width: 50vw;
  gap: 15px;
}
@media only screen and (max-width: 675px) {
  #searchBox {
    width: 100%;
  }
}
::v-deep(.product-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s;
  &:hover{
    background-color: var(--gray-900);
  }
	img {
		width: 5rem;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
    border-radius: 5px;
	}
	.product-list-detail {
		flex: 1 1 0;
	}
h3.product-name {
      margin: 0;
      word-break: break-word;
}
  .product-description {
    max-height: 85px;
    overflow: hidden;
    font-size: 0.95rem;
    margin-top: 5px;
    opacity: 0.8;
  }
small{
  opacity: 0.5;
}
}
::v-deep(.product-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);
	.product-grid-item-top,
	.product-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	img {
		width: 75%;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}
	.product-grid-item-content {
		text-align: center;
	}
	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
	}
}
</style>
