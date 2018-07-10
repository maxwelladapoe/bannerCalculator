<template>
    <div class="wrapper">
        <div class="top">

            <div class="invoice-sender">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <p class="editable big"> Company Name</p>
                        <p class="editable small"> Your Name</p>
                        <p class="editable small"> Company Address</p>
                        <p class="editable small"> Phone Number</p>
                    </el-col>

                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <h1 class="description">Invoice</h1>
                    </el-col>
                </el-row>
            </div>

            <div class="invoice-receiver">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <p class="editable title"> Bill To: </p>
                        <p class="editable big"> Client Name</p>
                        <p class="editable small"> Client Address</p>
                        <p class="editable small"> Phone Number</p>
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
                        width="50">
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
                <el-table-column label="Unit Price" width="150">
                    <template slot-scope="scope">
                        <template v-if="!scope.row.editing">
                            <p>{{scope.row.unitPrice}}</p>
                        </template>
                        <template v-else>
                        <el-input v-model="scope.row.unitPrice" :disabled="!scope.row.editing"></el-input>
                        </template>
                    </template>
                </el-table-column>

                <el-table-column label="Amount" width="200">
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
                        <p class="add-btn" @click="addItem"><i class="el-icon-circle-plus text-success"></i> Add New Item</p>

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
    name: 'invoice-page',
    data () {
      return {}
    },
    methods: {
      addItem () {
        this.tableData.push({
          description: 'Enter Item Here',
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
      }
    },
    computed: {
      tableData () {
        let storeData = this.itemsToBeAddedToInvoice
        if (storeData.length > 0) {
          return storeData
        } else {
          return [{
            description: '',
            quantity: 1,
            unitPrice: 0,
            amount: 0,
            editing: false
          }]
        }
      },
      itemsToBeAddedToInvoice () {
        return this.$store.state.itemsAddedToInvoice
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
        padding-top: 2em;
        padding-left: 2em;
        padding-right: 2em;

        .invoice-receiver {
            margin-top: 5em;
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

    .el-button{
        width: 40px !important;
        height: 40px !important;
    }




</style>