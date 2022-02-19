<v-tabs class="d-flex flex-column-reverse" centered v-model="activeTab">
              <v-tab-item>
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <row
                    no-gutters
                    class="glass-info-card d-flex align-start"
                    style="width:100%; max-height:160px; height:160px;">
                    <v-col>
                      <div
                        class="text-h4 text-lg-h5 font-weight-black text-truncate text-capitalize"
                        style="color:black; overflow: hidden;"
                      >
                        {{ anuncioUsuario.Sec_Descripcion.titulo }}
                      </div>
                      <p
                        class="text-caption text-justify"
                        style="color:white; max-height: 80px; overflow: hidden; margin-bottom: 28px; line-height: 13px;"
                      >
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Dolorum ut iure soluta nam quia tenetur quibusdam
                        saepe et cupiditate, libero minima quiLorem ipsum dolor
                        sit, amet consectetur adipisicing elit. Dolorum ut iure
                        soluta nam quia tenetur quibusdam saepe et cupiditate,
                        libero minima officiis impedit fugiat voluptates nisi
                        consequatur inventore? Dignissimos.
                      </p>
                    </v-col>
                  </row>
                  
                  <v-row no-gutters style="overflow: hidden;">
                    <v-col>
                      <v-card flat class="mb-2">
                        <template
                          v-for="line in anuncioUsuario.Sec_Descripcion.descripcion.split('\n')">{{line}}<br></template>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!--Descripcion-->
                </v-container>
              </v-tab-item>
              <!--Descripcion-->

              <v-tab-item>
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <dashboard-compras tipo="actualizacion"></dashboard-compras>
                  <!--Componente de Compra-->
                </v-container>
              </v-tab-item>
              <!--Actualizacion-->

              <v-tab-item>
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <dashboard-compras tipo="paquetes"></dashboard-compras>
                </v-container>
              </v-tab-item>
              <!--Compras-->

              <v-tab-item>
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        Edición
                      </div>
                    </v-col>
                  </v-row>
                  <!--Título-->
                  <v-row no-gutters>
                    <v-col cols="6" md="3">
                      <div class="text-h7 text-xl-h6 mb-4">
                        Lorem Ipsum
                      </div>
                    </v-col>
                    <v-col cols="6" md="3">
                      <div class="text-h7 text-xl-h6">
                        Lorem Ipsum
                      </div>
                    </v-col>
                  </v-row>
                  <!--EstadoCiudad-->
                  <v-row no-gutters style="overflow: hidden;">
                    <v-col>
                      <v-card flat class="mb-2">
                        <template
                          v-for="line in anuncioUsuario.Sec_Descripcion.descripcion.split('\n')">{{line}}<br></template>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!--Descripcion-->
                </v-container>
              </v-tab-item>
              <!--Edicion-->

              <v-tab-item>
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                  <v-row no-gutters>
                    <v-col>
                      <div class="text-h4 text-xl-h3 mb-4">
                        Eliminar
                      </div>
                    </v-col>
                  </v-row>
                  <!--Título-->

                  <v-row no-gutters>
                    <v-col cols="12">
                      <div class="text-h8 text-center">
                        Estas Seguro de eliminar el anuncio?
                      </div>
                    </v-col>
                  </v-row>
                  <v-row no-gutters justify="center">
                    <v-col cols="4" class="mt-12">
                      <v-btn depressed elevation="2" color="primary" width="140"
                        @click='borrarAnuncio(anuncioUsuario.id)'>
                        <font-awesome-icon :icon="['fas', 'trash-alt']" class="tw-redes-icons fa-2x mr-1" /> Borrar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
              <!--Eliminar-->

              <v-tab-item>
                <v-container fluid style="height: 440px; overflow:hidden;" class="pa-4 pa-lg-8">
                </v-container>
                <!--Descripcion-->
              </v-tab-item>
              <!--Preview-->

              <v-tab style="min-width:60px!important;">
                <font-awesome-icon :icon="['fas', 'home']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--tab Descripcion-->
              <v-tab style="min-width:60px!important;">
                <font-awesome-icon :icon="['fas', 'sync-alt']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--tab Actualizacion-->
              <v-tab style="min-width:60px!important;">
                <font-awesome-icon :icon="['fas', 'shopping-bag']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--tab Compras-->
              <v-tab style="min-width:60px!important;" @click="abrirEdicion">
                <font-awesome-icon :icon="['fas', 'pencil-alt']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--tab Edicion-->
              <v-tab style="min-width:60px!important;">
                <font-awesome-icon :icon="['fas', 'trash-alt']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--tab Eliminar-->
              <v-tab style="min-width:60px!important;">
                <font-awesome-icon :icon="['fas', 'eye']" class="tw-redes-icons fa-2x" />
              </v-tab>
              <!--tab PreView-->
            </v-tabs>