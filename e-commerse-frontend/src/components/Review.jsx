import React from 'react'

function Review() {
  return (
    <div class="container container-fluid">
    <div class="row justify-content-center mt-5">
        <div class="col-5">
                        <form>
                            <div class="form-group">
                                <label for="productId_field">Enter Product ID</label>
                                <input
                                    type="text"
                                    id="email_field"
                                    class="form-control"
                                    value=''
                                />
                            </div>

                            <button
                                id="search_button"
                                type="submit"
                                class="btn btn-primary btn-block py-2"
                            >
                                SEARCH
                            </button>
                        </form>
                    </div>
        
    </div>
</div>
  )
}

export default Review