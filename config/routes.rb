Miniwdwot::Application.routes.draw do

  resources :organizations, only: [:index, :show, :update, :destroy] do
    resources :groups, only: [:index]
  end


  resources :groups, only: [:show] do
    resources :maps, only: [:index]
  end

  resources :maps, only: [:show] do
    resources :properties, only: [:index]
  end

  post   '/verify',  to: 'organizations#verify'

  root to: 'high_voltage/pages#show', id: 'welcome'

end

# organization_groups GET    /organizations/:organization_id/groups(.:format) groups#index
#       organizations GET    /organizations(.:format)                         organizations#index
#        organization GET    /organizations/:id(.:format)                     organizations#show
#                     PATCH  /organizations/:id(.:format)                     organizations#update
#                     PUT    /organizations/:id(.:format)                     organizations#update
#                     DELETE /organizations/:id(.:format)                     organizations#destroy
#          group_maps GET    /groups/:group_id/maps(.:format)                 maps#index
#               group GET    /groups/:id(.:format)                            groups#show
#      map_properties GET    /maps/:map_id/properties(.:format)               properties#index
#                 map GET    /maps/:id(.:format)                              maps#show
#             sign_in POST   /sign_in(.:format)                               organizations#sign_in
#                root GET    /                                                high_voltage/pages#show {:id=>"welcome"}
#                page GET    /pages/*id                                       high_voltage/pages#show