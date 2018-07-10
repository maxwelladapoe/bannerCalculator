<template>
    <div class="wrapper">
        <el-row>
            <el-col :xs="24" :sm="24" :md="10" :lg="12" :xl="14" class="left">
                <el-form ref="form" :model="banner" label-position="top">


                    <el-form-item label="Width">
                        <el-row :gutter="10">
                            <el-col  :xs="24" :sm="24" :md="14" :lg="14" :xl="16">
                                <el-input-number size="large" v-model="banner.width" controls-position="right"
                                                 @change="handleChange" :min="1"></el-input-number>
                            </el-col>

                            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="8">
                                <el-select v-model="banner.widthMeasurement" placeholder="please select your zone">
                                    <el-option v-for="measurement in measurements" :label="measurement"
                                               :value="measurement"></el-option>
                                </el-select>
                            </el-col>


                        </el-row>

                    </el-form-item>

                    <el-form-item label="Height">

                        <el-row :gutter="10">

                            <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="16">
                                <el-input-number v-model="banner.height" controls-position="right"
                                                 @change="handleChange" :min="1"></el-input-number>
                            </el-col>

                            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="8">
                                <el-select class="selectOption" v-model="banner.heightMeasurement"
                                           placeholder="please select your measurement">
                                    <el-option v-for="measurement in measurements" :label="measurement"
                                               :value="measurement"></el-option>
                                </el-select>
                            </el-col>

                        </el-row>


                    </el-form-item>

                    <el-form-item label="Quantity">
                        <el-input-number v-model="quantity" controls-position="right"
                                         @change="handleChange" :min="1"></el-input-number>

                    </el-form-item>

                    <el-form-item label="Price">
                        <el-input-number v-model="pricePerSquareFeet" controls-position="right" @change="handleChange"
                                         :step="0.1"
                                         :min="1"></el-input-number>

                    </el-form-item>

                    <el-form-item style="text-align: right">
                        <el-button type="success" @click="calculateBannerPrice">Calculate</el-button>

                    </el-form-item>


                </el-form>
            </el-col>

            <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="6" :offset="2" class="right">
                <p class="label">Price</p>
                <p class="calculatedPrice text-success">{{totalCost }}</p>
                <div class="brief">
                    <p class="small-info"><i class="el-icon-info"></i> Width: {{banner.width + " " + banner.widthMeasurement}} X Height: {{banner.width + " " + banner.heightMeasurement}}</p>
                </div>

                <p class="add-btn" @click="addItemToInvoice"><i class="el-icon-circle-plus text-success"></i> Add to Invoice</p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        banner: {
          width: 1,
          height: 1,
          widthMeasurement: 'Feet',
          heightMeasurement: 'Feet'
        },
        quantity: 1,
        pricePerSquareFeet: 1.2,
        totalCost: 'GH₵ 0',
        totalCostRaw: 0,
        measurements: {
          1: 'Centimeters',
          2: 'Millimeters',
          3: 'Meters',
          4: 'Inches',
          5: 'Feet'
        }
      }
    },
    methods: {
      handleChange (value) {
      },
      convertToFeet (value, measurement) {
        let result
        switch (measurement) {
          case 'Centimeters':
            result = value * 0.0328084
            break
          case 'Millimeters':
            result = value * 0.00328084
            break
          case 'Meters':
            result = value * 3.28084
            break
          case 'Inches':
            result = value * 0.0833333
            break
          case 'Feet':
            result = value * 1
            break
        }
        return result
      },
      calculateBannerPrice () {
        // calculating the price of the banner
        let widthInFeet = this.convertToFeet(this.banner.width, this.banner.widthMeasurement)
        let heightInFeet = this.convertToFeet(this.banner.height, this.banner.heightMeasurement)
        this.totalCostRaw = (this.pricePerSquareFeet * widthInFeet * heightInFeet * this.quantity).toFixed(4)
        this.totalCost = 'GH₵' + this.totalCostRaw
      },
      addItemToInvoice () {
        if (this.totalCostRaw) {
          let data = {
            description: this.banner.width + ' ' + this.banner.widthMeasurement + ' x ' + this.banner.height + ' ' + this.banner.heightMeasurement,
            quantity: this.quantity,
            unitPrice: this.pricePerSquareFeet,
            amount: this.totalCostRaw,
            editing: false
          }

          this.$store.commit('addItemToInvoice', data)

          this.$notify({
            title: 'Success',
            message: 'The item has been added to the The Invoice',
            type: 'success'
          })
        } else {
          this.$notify({
            title: 'Sorry',
            message: 'Sorry you cant add an empty item to the invoice',
            type: 'warning'
          })
        }
      }
    }
  }
</script>

<style lang="scss">

    .wrapper {
        width: 100%;
        height: 100%;
        .left {
            padding-top: 2em;
            padding-left: 2em;
            height: 100%;
        }
        .right {
            padding-top: 2em;
            padding-left: 2em;
            height: 100% !important;

        }
        .el-row {
            height: 100%;
        }

        .el-input-number,.el-button {
            width: 100%;
        }
        .calculatedPrice {
            font-size: 2em;
            line-height: 0;
            font-weight: 600;
        }

        .small-info{
            font-size: 0.8em;
        }

        .add-btn {
            margin-top: 5px;
            cursor: pointer;
        }

    }

</style>
