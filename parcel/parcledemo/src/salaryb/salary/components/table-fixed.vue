<template>
  <section class="table-fixed">
    <div class="table-header">
      <table>
        <thead>
          <slot name="header"></slot>
        </thead>
      </table>
    </div>

    <div class="table-body">
      <table>
        <tbody>
          <slot name="body"></slot>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style lang="less">
.table-fixed {
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  th {
    background: #f2fbf6;
    font-size: 14px;
    color: #878d99;
    padding: 5px 0;
  }

  td {
    font-size: 14px;
    color:#5a5e66;
    padding: 10px 20px;
  }

  tr:hover {
    background: #f2fbf6;
  }
}

.table-body {
  table {
    border: 1px solid #F1F1F1;
  }

  td {
    border-bottom: 1px solid #F1F1F1;
  }
}
</style>