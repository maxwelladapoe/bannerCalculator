<template>
    <div class="wrapper">

        <div class="userSettings">
            <div class="top">

                <el-row>
                    <el-col :xs="24" :sm="24" :md="14" :lg="12" :xl="12" class="billTo">
                        <p class="editable title with-buttons"> User Credentials:  <span class="editButtons">

                                  <el-button v-if="!userCredentials.editing"
                                             @click.native.prevent="editUserCredentials"
                                             icon="el-icon-edit" class="specialBtn text-primary">Edit
                        </el-button>

                        <el-button v-else
                                   @click.native.prevent="saveUserCredentials"
                                   type="success"
                                   icon="el-icon-check" class="specialBtn text-success">Save
                        </el-button>

                        </span></p>
                        <template v-if="userCredentials.editing">
                            <el-col :xs="20" :sm="20" :md="26" :lg="14" :xl="14">
                                <el-form ref="form" :model="userCredentials" label-width="160px" size="small" label-position="top">
                                    <el-form-item label="Company Name">
                                        <el-input v-model="userCredentials.companyName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Company Email">
                                        <el-input v-model="userCredentials.companyEmail" type="email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Company Contact">
                                        <el-input v-model="userCredentials.companyContact"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Company Address">
                                        <el-input v-model="userCredentials.companyAddress"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>

                        </template>

                        <template v-else>
                            <p class="editable big"> {{userCredentials.companyName ? userCredentials.companyName  :'Your Company Name'}}</p>
                            <p class="editable small"> {{userCredentials.companyEmail ? userCredentials.companyEmail :'Your Company Email'}}</p>
                            <p class="editable small"> {{userCredentials.companyContact ? userCredentials.companyContact : 'Your Company Address'}}</p>
                            <p class="editable small"> {{userCredentials.companyAddress ? userCredentials.companyAddress : 'Your Company Contact'}}</p>
                        </template>

                    </el-col>

                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">


                    </el-col>
                </el-row>

            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SettingsPage',
    data () {
      return {
        userCredentials: {
          companyName: '',
          companyAddress: '',
          companyContact: '',
          companyEmail: '',
          companyLogo: '',
          defaultMeasurement: 'Foot',
          defaultPrice: 1.2,
          editing: false
        }
      }
    },
    methods: {
      editUserCredentials () {
        this.userCredentials.editing = true
      },
      saveUserCredentials () {
        this.userCredentials.editing = false
        // save to database here and notify
        this.$db.update({_id: 'idMain112233'}, {$set: {defaultSystemVariables: {
          companyName: this.userCredentials.companyName,
          companyAddress: this.userCredentials.companyAddress,
          companyContact: this.userCredentials.companyContact,
          companyEmail: this.userCredentials.companyEmail} }}, {}, (err, numReplaced) => {
          if (err) {
            console.log(err)
          } else {
            console.log(numReplaced)
          }
        })
      },

      defaultVariables () {
        this.$db.findOne({_id: 'idMain112233'}, (err, docs) => {
          if (err !== null) {
            console.log(err)
          } else {
            let second = {editing: false}
            this.userCredentials = {...docs.defaultSystemVariables, ...second}
            this.$notify({
              title: 'Success',
              message: 'You have successfully updated your credentials',
              type: 'success'
            })
            // console.log(this.userCredentials)
          }
        })
      }
    },
    mounted () {
      this.defaultVariables()
    }
  }
</script>

<style scoped lang="scss">

    .wrapper {
        min-height: 100%;
        width: 100%;

        .userSettings {
            .top {
                padding: 5em 5em 0em;
            }
        }

        .title{
            font-size: 1.2em;
            font-weight: 600;
            span{
                font-size: 0.7em;
            }
        }

        .el-button {
            width: 40px !important;
            height: 40px !important;
            &.specialBtn {
                width: auto !important;
                height: auto !important;
                font-size: 1em;
                background-color: transparent;
                border: none;
                padding: 0;
            }
        }
    }
</style>