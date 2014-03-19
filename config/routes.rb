Miniwdwot::Application.routes.draw do

  resources :organizations, only: [:index, :show, :edit, :update, :destroy] do
    get '/properties',            to: 'organizations#properties'
    get '/featured_properties',   to: 'organizations#featured_properties'
    get '/about',                 to: 'organizations#about'
  end

  get    '/sign_in',  to: 'organizations/sessions#new'
  post   '/sign_in',  to: 'organizations/sessions#create'
  delete '/sign_out', to: 'organizations/sessions#destroy'

  root :to => "organizations#index"

  # root :to => "main#index"

end

# organization_properties GET    /organizations/:organization_id/properties(.:format) organizations#properties
#   organization_featured GET    /organizations/:organization_id/featured(.:format)   organizations#featured
#      organization_about GET    /organizations/:organization_id/about(.:format)      organizations#about
#           organizations GET    /organizations(.:format)                             organizations#index
#       edit_organization GET    /organizations/:id/edit(.:format)                    organizations#edit
#            organization GET    /organizations/:id(.:format)                         organizations#show
#                         PATCH  /organizations/:id(.:format)                         organizations#update
#                         PUT    /organizations/:id(.:format)                         organizations#update
#                         DELETE /organizations/:id(.:format)                         organizations#destroy
#                 sign_in GET    /sign_in(.:format)                                   organizations/sessions#new
#                         POST   /sign_in(.:format)                                   organizations/sessions#create
#                sign_out DELETE /sign_out(.:format)                                  organizations/sessions#destroy
#                    root GET    /                                                    organizations#index
