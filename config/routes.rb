Miniwdwot::Application.routes.draw do

  resources :organizations, only: [:index, :show, :update, :destroy]

  post   '/sign_in',  to: 'organizations/sessions#create'

  root :to => "organizations#index"

end

# organizations GET    /organizations(.:format)     organizations#index
#  organization GET    /organizations/:id(.:format) organizations#show
#               PATCH  /organizations/:id(.:format) organizations#update
#               PUT    /organizations/:id(.:format) organizations#update
#               DELETE /organizations/:id(.:format) organizations#destroy
#       sign_in POST   /sign_in(.:format)           organizations/sessions#create
#          root GET    /                            organizations#index
