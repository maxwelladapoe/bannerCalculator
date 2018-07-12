<template>
    <div class="wrapper">
        <div class="top">

            <div class="invoice-sender">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <p class="editable big"> {{defaultData.companyName}}</p>
                        <p class="editable small"> {{defaultData.companyEmail}}</p>
                        <p class="editable small"> {{defaultData.companyAddress}}</p>
                        <p class="editable small"> {{defaultData.companyContact}}</p>
                    </el-col>

                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <h1 class="description">Invoice</h1>
                    </el-col>
                </el-row>
            </div>

            <div class="invoice-receiver">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="14" :lg="12" :xl="12" class="billTo">
                        <p class="editable title with-buttons"> Bill To: <span class="editButtons">

                                  <el-button v-if="!receiverData.editing"
                                             @click.native.prevent="editReceiverInfo"
                                             icon="el-icon-edit" class="specialBtn text-primary">Edit
                        </el-button>

                        <el-button v-else
                                   @click.native.prevent="saveReceiverInfo"
                                   type="success"
                                   icon="el-icon-check" class="specialBtn text-success">Save
                        </el-button>

                        </span></p>
                        <template v-if="receiverData.editing">
                            <el-col :xs="20" :sm="20" :md="26" :lg="14" :xl="14">
                                <el-form ref="form" :model="receiverData" label-width="120px" size="small">
                                    <el-form-item label="Client Name">
                                        <el-input v-model="receiverData.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Client Email">
                                        <el-input v-model="receiverData.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Client Contact">
                                        <el-input v-model="receiverData.contact"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Client Address">
                                        <el-input v-model="receiverData.address"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>

                        </template>

                        <template v-else>
                            <p class="editable big"> {{receiverData.name ? receiverData.name :'Client Name'}}</p>
                            <p class="editable small"> {{receiverData.email ? receiverData.email :'Client Email'}}</p>
                            <p class="editable small"> {{receiverData.contact ? receiverData.contact : 'Client Contact'}}</p>
                            <p class="editable small"> {{receiverData.address ? receiverData.address : 'Client Address'}}</p>
                        </template>

                    </el-col>

                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">


                    </el-col>
                </el-row>
            </div>

        </div>


        <div class="invoice">
            <el-table :data="tableData" style="width: 100%" stripe>
                <el-table-column
                        type="index"
                        width="80">
                </el-table-column>
                <el-table-column label="Description">
                    <template slot-scope="scope">
                        <template v-if="!scope.row.editing">
                            <p>{{scope.row.description ? scope.row.description:'Enter Item Here'}}</p>
                        </template>
                        <template v-else>
                            <el-input v-model="scope.row.description"></el-input>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="Quantity" width="120">
                    <template slot-scope="scope">
                        <template v-if="!scope.row.editing">
                            <p>{{scope.row.quantity}}</p>
                        </template>
                        <template v-else>
                            <el-input v-model="scope.row.quantity"></el-input>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="Unit Price (GH₵)" width="150">
                    <template slot-scope="scope">
                        <template v-if="!scope.row.editing">
                            <p>{{scope.row.unitPrice}}</p>
                        </template>
                        <template v-else>
                            <el-input v-model="scope.row.unitPrice" :disabled="!scope.row.editing"></el-input>
                        </template>
                    </template>
                </el-table-column>

                <el-table-column label="Amount (GH₵)" width="200">
                    <template slot-scope="scope">
                        <template v-if="!scope.row.editing">
                            <p>{{scope.row.amount}}</p>
                        </template>
                        <template v-else>
                            <el-input v-model="scope.row.amount"></el-input>
                        </template>
                    </template>
                </el-table-column>

                <el-table-column>
                    <template slot-scope="scope">

                        <el-button v-if="!scope.row.editing"
                                   @click.native.prevent="editRow(scope.$index, tableData)"
                                   type="primary"
                                   icon="el-icon-edit" circle>
                        </el-button>

                        <el-button v-else
                                   @click.native.prevent="saveRow(scope.$index, tableData)"
                                   type="success"
                                   icon="el-icon-check" circle>
                        </el-button>

                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="danger"
                                icon="el-icon-delete" circle>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="under-invoice">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <p class="add-btn" @click="addItem"><i class="el-icon-circle-plus text-success"></i> Add New
                            Item</p>

                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">

                        <p class="total">Total:</p>
                        <p class="total-amount text-success">GH₵ {{totalAmount}}</p>

                    </el-col>

                </el-row>
            </div>


        </div>


    </div>
</template>

<script>
  export default {
    name: 'invoice-page',
    data () {
      return {
        receiverData: {
          name: '',
          contact: '',
          email: '',
          address: '',
          editing: false
        },
        defaultData: {},
        dataHolderVerify: {}
      }
    },
    mounted () {
      this.defaultVariables()
    },
    methods: {
      addItem () {
        this.tableData.push({
          description: '',
          quantity: 1,
          unitPrice: 0,
          amount: 0,
          editing: false
        })
      },
      editRow (index, row) {
        console.log(index, row)
        this.tableData[index].editing = true
      },
      deleteRow (index, row) {
        if (this.tableData.length > 1) {
          this.tableData.splice(index, 1)
        } else {
          this.$notify({
            title: 'Oops!!',
            message: 'There needs to be at least one item in the invoice',
            type: 'warning'
          })
        }
      },
      saveRow (index, row) {
        this.tableData[index].editing = false
      },
      amountCal (index, row) {
        console.log(index)
        let invoiceItem = this.tableData[index]
        console.log(invoiceItem)
        invoiceItem.amount = invoiceItem.quantity * invoiceItem.unitPrice
        return invoiceItem.amount
      },
      saveReceiverInfo () {
        this.receiverData.editing = false
      },
      editReceiverInfo () {
        this.receiverData.editing = true
      },
      defaultVariables () {
        this.$db.findOne({_id: 'idMain112233'}, (err, docs) => {
          if (err !== null) {
            console.log(err)
          } else {
            this.defaultData = docs.defaultSystemVariables
          }
        })
      }
    },
    computed: {
      tableData () {
        let storeData = this.itemsToBeAddedToInvoice
        if (storeData.length > 0) {
          this.dataHolderVerify = storeData
          return storeData
        } else if (this.dataHolderVerify.length > 0) {
          this.dataHolderVerify.concat(storeData)
          return this.dataHolderVerify
        } else {
          this.dataHolderVerify = [{
            description: '',
            quantity: 1,
            unitPrice: 0,
            amount: 0,
            editing: false
          }]
          return this.dataHolderVerify
        }
      },
      itemsToBeAddedToInvoice () {
        return this.$store.state.itemsAddedToInvoice
      },
      totalAmount () {
        let data = this.tableData
        let sum = 0
        data.forEach(invoiceItem => {
          let currentAmount = parseFloat(invoiceItem.amount)
          sum += currentAmount
        })
        return sum.toFixed(4)
      }
    }
  }
</script>

<style lang="scss" scoped>

    .wrapper {
        width: 100%;
    }

    p {
        margin: 0 0 3px;
    }

    .top {
        padding-top: 5em;
        padding-left: 5em;
        padding-right: 5em;

        .invoice-receiver {
            margin-top: 5em;

            .billTo {
                .editButtons {
                    display: none;
                }
                &:hover {
                    .editButtons {
                        display: inline-block;
                    }
                }
            }

        }
        .big {
            font-size: 1.5em;
        }
        .description {
            font-size: 2em;
            text-transform: uppercase;
            margin: 0;
        }
    }

    .invoice {
        width: 94%;
        padding: 2em;
        position: relative;

        .el-table {
            width: 100%;
        }
    }

    .under-invoice {
        margin-top: 2em;
        .add-btn {
            margin-top: 5px;
            cursor: pointer;
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

    .total {
        font-size: 1.2em;
        font-weight: 600;
    }

    .total-amount {
        font-size: 2em;
        font-weight: 600;
    }


</style>