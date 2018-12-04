<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-content
        v-for="(item, i) in items"
        :key="i"
        v-model="panel[i]"
      >
        <div slot="header">
          <v-flex headline font-weight-thin pl-2>{{item.name}}</v-flex>
        </div>
        <v-card>
          <v-layout pl-2>
            <v-card-text>{{ item.description }}
            </v-card-text>
            <v-flex>
              <v-btn dark small @click="addDialog = !addDialog"> Dodaj
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout justify-start>
            <v-flex v-if="addDialog" pl-5 pt-2>
              <v-flex pt-2>Wybierz dni tygodnia</v-flex>
              <v-btn-toggle v-model="toggle_multiple" multiple>
                <v-btn flat>
                  PON
                </v-btn>
                <v-btn flat>
                  WT
                </v-btn>
                <v-btn flat>
                  ŚR
                </v-btn>
                <v-btn flat>
                  CZW
                </v-btn>
                <v-btn flat>
                  PT
                </v-btn>
                <v-btn flat>
                  SOB
                </v-btn>
                <v-btn flat>
                  NDZ
                </v-btn>
              </v-btn-toggle>
              <v-layout row>
                <v-flex pt-3>
                  <p>Dodaj godziny przyjęcia leku </p>
                  <div>
                    <v-time-picker v-model="picker" :landscape="true" color="teal darken-4"></v-time-picker>
                  </div>
                  <v-btn dark @click="addHour()">Dodaj godzinę</v-btn>
                </v-flex>
                <v-flex>
                  <v-layout column>
                    <v-flex>
                      <v-card>
                        <v-toolbar color="teal darken-4" dark>

                          <v-toolbar-title>Wybrane godziny</v-toolbar-title>

                          <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-list>
                          <v-list-tile
                            v-for="item in pickersTable"
                            :key="item"
                            avatar
                            @click=""
                          >
                            <v-list-tile-content>
                              <v-list-tile-title v-text="item"></v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <v-btn color="teal darken-2" dark @click="deleteHour(item)">
                                Usuń
                              </v-btn>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </v-flex>
                    <v-flex>
                      <v-btn @click="addRule()">
                        Dodaj regułę
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import db from '../firebase/init'

  export default {
    name: 'adddrug',
    props: {
      pid: String
    },
    data () {
      return {
        dialog: true,
        items: [],
        addDialog: false,
        picker: null,
        pickersTable: [],
        toggle_multiple: [],
        currentMedicine: '',
        panel: [],
        ruleId: ''
      }
    },
    methods: {
      adddrugtobase () {
        this.$router.push({name: 'addnewmedicine'})
      },
      getMedicines () {
        console.log('W get')
        var items = []
        db.collection('medicines').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            items.push(doc.data())
          })
        })
          .catch(function (error) {
            console.log('Error getting documents: ', error)
          })
        this.items = items
      },
      addHour () {
        this.pickersTable.push(this.picker)
        this.picker = null
      },
      deleteHour (hour) {
        var index = this.pickersTable.indexOf(hour)
        if (index > -1) {
          this.pickersTable.splice(index, 1)
        }
      },
      addRule () {
        this.currentMedicine = this.items[this.panel.indexOf(true)].name.toLowerCase().replace(/\s/g, '')
        this.ruleId = (this.pid + this.currentMedicine).toString()
        db.collection('patients').doc(this.pid).update({
          rules: firebase.firestore.FieldValue.arrayUnion(this.ruleId)
        })
        db.collection('rules').doc(this.ruleId).set({
          medicine: this.currentMedicine.toString(),
          hours: this.pickersTable,
          days: this.toggle_multiple,
          medicineName: this.items[this.panel.indexOf(true)].name
        })
      }
    },
    mounted () {
      console.log('Pobieram')
      this.getMedicines()
    }
  }
</script>

<style scoped>

</style>
