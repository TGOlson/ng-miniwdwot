Miniwdwot::Application.routes.draw do

  resources :organizations, only: [:index, :show, :update, :destroy]

  post   '/sign_in',  to: 'organizations#sign_in'

  root to: 'high_voltage/pages#show', id: 'welcome'

end

# organizations GET    /organizations(.:format)     organizations#index
#  organization GET    /organizations/:id(.:format) organizations#show
#               PATCH  /organizations/:id(.:format) organizations#update
#               PUT    /organizations/:id(.:format) organizations#update
#               DELETE /organizations/:id(.:format) organizations#destroy
#       sign_in POST   /sign_in(.:format)           organizations#sign_in
#          root GET    /                            high_voltage/pages#show {:id=>"welcome"}
#          page GET    /pages/*id                   high_voltage/pages#show